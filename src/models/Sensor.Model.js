'use strict';
import Sensor from './schema/Sensor';
import BaseModel from './Base.Model'

export default class UserModel extends BaseModel {

  constructor(data) {
    super(Sensor, '_id', data)
  }
}