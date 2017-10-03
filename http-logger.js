'use strict'

const request = require('request')

function httpAppender (config, layout) {
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

    request.post({
      headers: config.headers,
      url: config.url,
      body: message
    }, (error, response) => {
      if (error !== null) {
        console.error('log4js-http appender - Error happened', error)
        return
      }
      if (response && response.statusCode !== 200) {
        console.error(`log4js-http appender - Error happened, response.statusCode: ${response.statusCode}`)
      }
    })
  }
}

function configure (config, layouts) {
  let layout = layouts.messagePassThroughLayout
  if (config.layout) {
    layout = layouts.layout(config.layout.type, config.layout)
  }
  return httpAppender(config, layout)
}

module.exports.configure = configure
module.exports.appender = httpAppender
module.exports.name = 'log4js-http'
