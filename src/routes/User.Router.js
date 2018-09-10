import express from 'express'
/*
  Import the resource controller, the code below its pretty intuitive :3
*/
import UserController from '../controllers/User.Controller'

let router = express.Router()
/*
  import student RESOURCE CONTROLLER 
*/
let us = new UserController()

import passport from 'passport'
const protect = passport.authenticate('jwt', {
	session: false
})

/*
  routing the controller object through student resource endpoints
*/
router.get('/', protect, (req, res) => {
  res.send({
    response: "hellow"
  })
})
router.post('/', protect, (req, res) => {
  us.save(req, res)
})

router.get('/:id', protect, (req, res) => {
  us.getById(req, res)
})
 
router.put('/:id', protect, (req, res) => {
  us.updateById(req, res)
})

router.delete('/:id', protect, (req, res) => {
  us.removeById(req, res)
})

export default router