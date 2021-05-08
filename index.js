const express = require('express')
const bodyParser = require('body-parser')
const { getAllVillains } = require('./controller/villains')

const app = express()

app.get('/villains', getAllVillains)

app.use(bodyParser.json())

app.all('*', (request, response) => {
  return response.sendStatus(404)
})

app.listen(1345, () => {
  console.log('listening on port 1345...') // eslint-disable-line no-console
})