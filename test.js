const http = require('http')

http.createServer((req, res) => {
  let body = []
  req.on('error', (err) => {
    console.error(err)
  }).on('data', (chunk) => {
    body.push(chunk)
  }).on('end', () => {
    body = Buffer.concat(body).toString()
    console.log(`body: ${body} `)
  })
}).listen(9615)

const log4js = require('log4js')

log4js.configure({
  appenders: {
    http: {
      type: 'log4js-http',
      url: 'localhost',
      port: 9615,
      object: true,
      addLevel: true
    }
  },
  categories: {default: {appenders: ['http'], level: 'info'}}
})

const logger = log4js.getLogger()

logger.info({'message': 'testLog'})
