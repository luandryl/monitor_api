'use strict';
import BaseController from './Base.Controller'
import Patient from '../models/Patient.Model'

export default class UserController extends BaseController {

  constructor() {
    super(Patient)
  }

  getByDoc (req, res) {
    let data = {
      _user: req.params.id
    }
    let patientPromise = new Patient().getByField(data)

    Promise.all([
      patientPromise
    ]).then((data) => {
      if (data) {
        res.status(200).json(data[0]).end();
      }
    }).catch (err => {
      console.log(err)
    })
  }
}