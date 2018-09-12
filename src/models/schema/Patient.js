'use strict'
import mongoose from 'mongoose'
/**
 * Restrictions
 */

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
/**
 * Student Schema
 */

const patientSchema = new mongoose.Schema({
  first_name: nameRestriction,
  last_name: nameRestriction,
  email: emailRestriction,
  age: ageRestricion,
  weight: weightRestricion,
  medicines: nameRestriction,
})

export default mongoose.model('Patient', patientSchema)