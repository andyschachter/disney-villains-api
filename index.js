const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.all('*', (request, response) => {
  return response.sendStatus(404)
})

app.listen(1345, () => {
  console.log('listening on port 1345...') // eslint-disable-line no-console
})