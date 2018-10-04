'use strict'
import mongoose from 'mongoose'
/**
 * Restrictions
 */

const userRestriction = {
	type: mongoose.Schema.Types.ObjectId,
	ref: 'User',
	required: true
}

const nameRestriction = {
  type: String,
  required: [true, 'No name given'],
  minlength: [3, 'Name too short'],
  maxlength: [100, 'Name too big'],
}

const emailRestriction = {
  type: String,
  required: [true, 'No email given'],
}

const ageRestricion = {
    type: Number,
    required: [true, 'No Age given']
}
const weightRestricion = {
    type: Number,
    required: [true, 'No weight given']
}

const sexRestriction = {
  type: String,
  required: [true, 'no sex given']
}

const sendentaryRestriction = {
  type: String,
  required: [true, 'please inform the situation of physics atv']
}

const sensorRestricion = {
  type: Number,
  required: [true, 'No weight given']
}


/**
 * Student Schema
 */

const patientSchema = new mongoose.Schema({
  _user: userRestriction,
  first_name: nameRestriction,
  last_name: nameRestriction,
  email: emailRestriction,
  age: ageRestricion,
  weight: weightRestricion,
  sex: sexRestriction,
  sedentary: sendentaryRestriction,
  medicines: nameRestriction,
  sensor: sensorRestricion
})

export default mongoose.model('Patient', patientSchema)