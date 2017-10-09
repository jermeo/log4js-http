# log4js-http
An appender for [log4js-node](https://github.com/nomiddlename/log4js-node) which support an http logger middleware.

## Note

Use [request](https://www.npmjs.com/package/request) internally

## Installation

```
$ npm i --save log4js-http
```

## Usage
Config log4js-http is same as the original [log4js-node](https://github.com/nomiddlename/log4js-node).

### Send log string to an http middleware

```javascript

const log4js = require('log4js')

log4js.configure({
  appenders: {
    http: {
      type: 'log4js-http',
      layout: {type: 'basic'},
      url: 'url of your http middleware',
      port: optionnal port of your http middleware (80 by default),
      path: 'optionnal path (/ by default)',
      headers: 'optionnal headers'
    }
  },
  categories: {default: {appenders: ['http'], level: 'info'}}
})

const logger = log4js.getLogger()

logger.info('something to log')

```
NB :

url is mandatory, headers are optionals.

headers need to be a key/value object.

ex: headers: {key1:value1,key2:value2}

### Send custom log object to an http middleware

If you send objects, the log4js output formatting will be bypassed

```javascript

const log4js = require('log4js')

log4js.configure({
  appenders: {
    http: {
      type: 'log4js-http',
      url: 'url of your http middleware',
      port: optionnal port of your http middleware (80 by default),
      path: 'optionnal path (/ by default)',
      headers: 'optionnal headers',
      object: true,
      addLevel: true
    }
  },
  categories: {default: {appenders: ['http'], level: 'info'}}
})

const logger = log4js.getLogger()

logger.info({'message': 'something to log'})

```

object: true/false, if not present, log is considered to be a string.

addLevel: true/false, auto add level attribute to your object. False if not present.

```javascript
{'message': 'something to log'} -> {'message': 'something to log', level: 'INFO'}
```


