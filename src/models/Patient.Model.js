'use strict';
import Patient from './schema/Patient';
import BaseModel from './Base.Model'

export default class UserModel extends BaseModel {

  constructor(data) {
    super(Patient, '_id', data)
  }
}