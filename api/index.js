const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/', (req, res, next) => {
  console.log(req.body)
  res.send(req.body.token)
})

module.exports = {
  path: '/api',
  handler: app,
}
