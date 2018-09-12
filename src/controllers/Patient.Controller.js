'use strict';
import BaseController from './Base.Controller'
import Patient from '../models/Patient.Model'

export default class UserController extends BaseController {

  constructor() {
    super(Patient)
  }
}