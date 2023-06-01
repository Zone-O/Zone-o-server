'use strict'

/** @module route */

const express = require('express')
const app = express()

app.set('json spaces', 2)

const PORT = 3000
const HOST = '0.0.0.0'

app.use(function (req, res, next) {
  // Allow access request from any computers
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE,PATCH')
  res.header('Access-Control-Allow-Credentials', true)
  if ('OPTIONS' == req.method) {
    res.sendStatus(200)
  } else {
    next()
  }
})

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/about.json', async (req, res) => {
  try {
    const about = {}
    about.client = { host: req.ip }
    about.server = {
      current_time: Date.now(),
      services: []
    }
    res.header('Content-Type', 'application/json')
    res.type('json').send(JSON.stringify(about, null, 2) + '\n')
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

app.listen(PORT, HOST, async () => {
  console.log(`Server is starting...`)
  console.log(`Server running http://${HOST}:${PORT}`)
})

module.exports = { app }
