'use strict';
import BaseController from './Base.Controller'
import Patient from '../models/Patient.Model'
import Sensor from '../models/Sensor.Model'

export default class UserController extends BaseController {

  constructor() {
    super(Patient)
  }

  loadDataFromSensorTag(req, res) {
    let data = {
      sensorTag: req.params.id
    }
    console.log(data)
    new Sensor().getByField(data).then(data => {
      if (data) {
        res.json(data).status(200).end()
      }
    }).catch(err => {
      console.log(err)
    })
  }

  saveBpm (req, res) {
    if (req.body) {
      const sensorTag = req.body.sensorTag.split('\\')[0]
      let bpm = req.body.bpm.split('\\')[0]
      let data = {
        sensorTag: sensorTag,
        bpm: bpm
      }
      new Sensor(data).persist().then((savedObj) => {
        res.send(savedObj[0]).status(201).end()
      }).catch(err => {
        console.log(err)
      })
      res.end();
    }
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