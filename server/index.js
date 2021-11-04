import mqtt from 'mqtt'
import mongoose from 'mongoose'
import {executeProcessListener} from '../utils/index.js';
import {
  EngineSpeed,
  Coord,
  Fuel,
  Gyroscope
}  from './models.js'
import {
  DEVICE_ENGINE_SPEED_TOPIC,
  DEVICE_FUEL_TOPIC,
  DEVICE_COORD_TOPIC,
  DEVICE_GYROSCOPE_TOPIC
} from '../utils/constants.js'

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test')
}

const client = mqtt.connect('mqtt://localhost:1883', {
  keepalive: 10,
  clean: true,
  reconnectPeriod: 2000,
  connectTimeout: 2000,
  username: 'mosquitto',
  password: 'mosquitto',
  rejectUnauthorized: false
})

async function saveModelData(Model, message) {
  const model = new Model({
    data: message,
    time: new Date()
  })
  await model.save()
}

main().catch(err => console.log(err))

client.on('connect', () => {
  console.log(`Connected to MQTT Broker`)

  client.subscribe(DEVICE_ENGINE_SPEED_TOPIC)
  client.subscribe(DEVICE_FUEL_TOPIC)
  client.subscribe(DEVICE_COORD_TOPIC)
  client.subscribe(DEVICE_GYROSCOPE_TOPIC)
})

client.on('message', (topic, message) => {
  console.log(`>> Received data from ${topic}\n>> Message: ${message}\n`)
  switch (topic) {
    case DEVICE_ENGINE_SPEED_TOPIC:
      return saveModelData(EngineSpeed, Number(message.toString()))
    case DEVICE_FUEL_TOPIC:
      return saveModelData(Fuel, Number(message.toString()))
    case DEVICE_COORD_TOPIC:
      return saveModelData(Coord, JSON.parse(`[${message.toString()}]`))
    case DEVICE_GYROSCOPE_TOPIC:
      return saveModelData(Gyroscope, JSON.parse(`[${message.toString()}]`))
  }
})

executeProcessListener(client)
