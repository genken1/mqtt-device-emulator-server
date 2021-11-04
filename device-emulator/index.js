import mqtt from 'mqtt'
import {
  executeProcessListener,
  getRandomArbitrary
} from '../utils/index.js';
import {
  DEVICE_ENGINE_SPEED_TOPIC,
  DEVICE_FUEL_TOPIC,
  DEVICE_COORD_TOPIC,
  DEVICE_GYROSCOPE_TOPIC
} from '../utils/constants.js'

const client = mqtt.connect('mqtt://localhost:1883', {
  keepalive: 10,
  clean: true,
  reconnectPeriod: 2000,
  connectTimeout: 2000,
  username: 'mosquitto',
  password: 'mosquitto',
  rejectUnauthorized: false
})


client.on('connect', () => {
  client.publish('/devices/connected', 'true')

  /**
   * Генерация значений
   */
  setInterval(() => {
    publishEngineSpeed()
    publishFuel()
    publishCoord()
    publishGyroscope()
  }, 3000)
})

function publishEngineSpeed() {
  const data = getRandomArbitrary(0, 11000)
  client.publish(DEVICE_ENGINE_SPEED_TOPIC, data.toString())
  console.log(`>> Send data to ${DEVICE_ENGINE_SPEED_TOPIC}\n>> Data: ${data}\n`)
}

function publishFuel() {
  const data = getRandomArbitrary(0, 70)
  client.publish(DEVICE_FUEL_TOPIC, data.toString())
  console.log(`>> Send data to ${DEVICE_FUEL_TOPIC}\n>> Data: ${data}\n`)
}

function publishCoord() {
  const data = [getRandomArbitrary(-180, 180, 6), getRandomArbitrary(-180, 180, 6)]
  client.publish(DEVICE_COORD_TOPIC, data.toString())
  console.log(`>> Send data to ${DEVICE_COORD_TOPIC}\n>> Data: ${data.toString().split(',').join(',  ')}\n`)
}

function publishGyroscope() {
  const data = [getRandomArbitrary(-180, 180, 2), getRandomArbitrary(-180, 180, 2), getRandomArbitrary(-180, 180, 2)]
  client.publish(DEVICE_GYROSCOPE_TOPIC, data.toString())
  console.log(`>> Send data to ${DEVICE_GYROSCOPE_TOPIC}\n>> Data: ${data.toString().split(',').join(', ')}\n`)
}

executeProcessListener(client)
