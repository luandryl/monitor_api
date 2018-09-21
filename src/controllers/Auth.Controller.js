/**
 * AuthController handle with login and signup process.
 * @module AuthController
 */
'use strict'

import User from '../models/User.Model'
import config from '../config/jwt'
import jwt from 'jsonwebtoken'
import HashPassword from '../services/HashPassword'

export default class AuthController {

	signup (req, res) {
		let data = req.body;
		/*
			Todo: encrypt Hash
		*/
		data.password = HashPassword.encrypt(req.body.password)

		new User(data).persist().then(user => {
			if (user) {
				let token = this._generateToken(user)
				res.set('authorization', `${token.type_token} ${token.acess_token}`)
				user.password = null
				let data = {
					token: token,
					user: user
				}
				res.status(201).json(data).end();
			} else {
				throw new Error('user_not_saved')
			}
		}).catch (err => {
			let errorMsg
			if (err.code === 11000) {
				if (err.errmsg.match(/email_1/)) errorMsg = 'duplicate_email'
				else if (err.errmsg.match(/login_1/)) errorMsg = 'duplicate_login'
			} else errorMsg = err.message
			res.status(400).json(errorMsg).end()
		})
	}

	login (req, res) {
		const data = {
			login: req.body.login
		}
		new User().getByField(data).then(user => {
			if (user.lenght !== 0){
				user = user[0];
				if (HashPassword.encrypt(req.body.password) === user.password) {
					let token = this._generateToken(user)
					res.set('authorization', `${token.type_token} ${token.acess_token}`)
					user.password = null
					let data = {
						token: token,
						user: user
					}
					res.status(200).json(data).end();
				} else {
					throw new Error('invalid_login_password')
				}
			} else {
				throw new Error('invalid_login_username')
			}
		}).catch(err => {
			console.log(err)
		})
	}

	_generateToken (data) {
		let tokenInfo = {
			'email': data.email,
			'login': data.login,
			'_id': data._id
		}
		return {
			'acess_token': jwt.sign(tokenInfo, config.secret, {
				expiresIn: 10080 // in seconds
			}),
			'type_token': 'Bearer'
		}
	}

}