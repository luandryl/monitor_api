'use strict'
import mongoose from 'mongoose'
const bpmRestricion = {
    type: Number,
    required: [true, 'No bpm given']
}

const sensorTagRestricion = {
    type: Number,
    required: [true, 'No bpm given']
}

const sensorSchema = new mongoose.Schema({
    bpm: bpmRestricion,
    sensorTag: sensorTagRestricion
})

export default mongoose.model('Sensor', sensorSchema)
  
