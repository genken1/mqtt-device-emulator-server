/**
 * Уведомление контроллера до того как приложения отключится
 */
function handleAppExit(client, options, err) {
  if (err) {
    console.log(err.stack)
  }

  if (options.cleanup) {
    client.publish('devices/connected', 'false')
  }

  if (options.exit) {
    process.exit()
  }
}

/**
 * Обработка ошибок при различных отключениях приложения
 */
export function executeProcessListener(client) {
  process.on('exit', handleAppExit.bind(null, client, {
    cleanup: true
  }))
  process.on('SIGINT', handleAppExit.bind(null, client, {
    exit: true
  }))
  process.on('uncaughtException', handleAppExit.bind(null, client, {
    exit: true
  }))
}


export function getRandomArbitrary(min, max, roundNum = 0) {
  const randomNum = Math.random() * (max - min) + min
  return Math.round((randomNum * Math.pow(10, roundNum))) / Math.pow(10, roundNum);
}
