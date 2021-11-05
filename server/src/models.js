import mongoose from 'mongoose';

const engineSpeedSchema = new mongoose.Schema({
  data: Number,
  time: Date
})

const coordSchema = new mongoose.Schema({
  data: [Number, Number],
  time: Date
})

const fuelSchema = new mongoose.Schema({
  data: Number,
  time: Date
})

const GyroscopeSchema = new mongoose.Schema({
  data: [Number, Number, Number],
  time: Date
})

export const EngineSpeed = mongoose.model('engine_speed', engineSpeedSchema)
export const Coord = mongoose.model('coord', coordSchema)
export const Fuel = mongoose.model('fuel', fuelSchema)
export const Gyroscope = mongoose.model('gyroscope', GyroscopeSchema)
