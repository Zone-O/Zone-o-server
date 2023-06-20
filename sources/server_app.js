'use strict'

/** @module route */

const express = require('express')
const app = express()
const {createFirstUser, GetUsers} = require('./database_utils')

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

app.get('/root_users', (req, res), async() => {
  const users = await GetUsers()
  res.send(users.length)
})


app.get('/', (req, res)=> {
  res.send('Hello World')
})

const server = app.listen(PORT, HOST, async () => {
  console.log(`Server is starting...`)
  console.log(`Server running http://${HOST}:${PORT}`)
  await createFirstUser()
})

app.close = () => {
  server.close()
  console.log('Server closed')
}

module.exports = app
