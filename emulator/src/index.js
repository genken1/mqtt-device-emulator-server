import mqtt from 'mqtt'
import fs from "fs";
import path from "path";
import {
  getRandomArbitrary,
  executeProcessListener
} from '../../utils/helpers.mjs';

const CERT = fs.readFileSync(path.resolve('./certificates/engine-speed/cert.pem'))
const KEY = fs.readFileSync(path.resolve('./certificates/engine-speed/key.pem'))
const DEVICE_ENGINE_SPEED_TOPIC = `$devices/${process.env.DEVICE_ENGINE_SPEED_ID}/events`

const client = mqtt.connect( `${process.env.YANDEX_IOT_CORE_BROKER_URL}`, {
  key: KEY,
  cert: CERT,
  rejectUnauthorized: false
})

client.on('connect', () => {
  console.log(`Connected to MQTT Broker!`)

  /**
   * Генерация значений
   */
  setInterval(() => {
    publishEngineSpeed()
  }, 3000)
})

function publishEngineSpeed() {
  const data = getRandomArbitrary(0, 11000)
  client.publish(DEVICE_ENGINE_SPEED_TOPIC, data.toString(), {qos: 1})
  console.log(`>> Send data to ${DEVICE_ENGINE_SPEED_TOPIC}\n>> Data: ${data}\n`)
}

executeProcessListener(client)
