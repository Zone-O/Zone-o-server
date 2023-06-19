import express from 'express'
import { getQQVEApartsInCity } from './algorithm.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  res.append('Reffer-Policy', 'no-refer-when-downgrade');
  next();
});

app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
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

const server = app.listen(3000, () => {
  console.log('Server started on port 3000')
})

app.close = () => {
  server.close()
  console.log('Server closed')
}

export default app
