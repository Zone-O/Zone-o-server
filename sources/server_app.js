'use strict'

/** @module route */
import express from 'express'
import { getQQVEApartsInCity } from './algorithm.js'
import {createFirstUser, GetUsers} from './database_utils'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
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

app.post('/qqveApartsInCity', async (req, res) => {
  try {
    const qqveApartsInCity = await getQQVEApartsInCity(req.body)
    res.status(200).json(qqveApartsInCity)
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
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

export default app
