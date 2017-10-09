'use strict'

const http = require('http')

const httpAppender = (config, layout) => {
  return (loggingEvent) => {
    let message
    if (config.object && config.object === true) { // log message is an object
      if (config.addLevel && config.addLevel === true) { // auto add level to object
        if (!loggingEvent.data[0].level) {
          loggingEvent.data[0].level = loggingEvent.level.levelStr
        }
      }
      message = JSON.stringify(loggingEvent.data[0])
    } else {
      // log4js format
      message = layout(loggingEvent)
    }

    const options = {
      protocol: config.protocol || 'http:',
      host: config.host,
      path: config.path || '/',
      port: config.port || 80,
      method: 'POST'
    }

    const req = http.request(options, (response) => {
      let status = response.statusCode
      if (status !== 200) {
        console.log(`log4js-http appender - Error happened - Response statusCode ${response.statusCode}`)
      }
    })

    req.write(message)

    req.on('err', (err) => {
      console.error('log4js-http appender - Error happened', err)
    })

    req.end()

  }
}

const configure = (config, layouts) => {
  let layout = layouts.messagePassThroughLayout
  if (config.layout) {
    layout = layouts.layout(config.layout.type, config.layout)
  }
  return httpAppender(config, layout)
}

module.exports.configure = configure
module.exports.appender = httpAppender
