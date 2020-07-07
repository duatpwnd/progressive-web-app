const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const { Client } = require('pg')

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'duadksk9!!',
  port: 3000,
})
client.connect()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/db_connect', (req, res) => {
  console.log('디비 커넥트')
  res.send('success')
})
app.get('/getToken', (req, res) => {
  console.log('종류:', req.query.device)
  if (req.query.device == 'pc') {
    client.query('SELECT mobile_token FROM test', (err, result) => {
      res.send(result.rows[0])
    })
  } else {
    client.query('SELECT pc_token FROM test', (err, result) => {
      console.log(result.rows[1].pc_token)
      res.send(result.rows[1])
    })
  }
})
app.post('/', (req, res, next) => {
  console.log('토큰들어옴', req.body.pc_token, req.body.mobile_token)
  if (req.body.pc_token != undefined) {
    client.query('SELECT * FROM test', (err, result) => {
      console.log('조회결과:', result)
      if (result.rows.length == 0 || result.rows[0].pc_token == null) {
        client.query(
          "INSERT INTO test(pc_token) VALUES('" + req.body.pc_token + "')",
          (err, result) => {
            console.log(result)
            res.send(result)
          }
        )
      }
    })
  } else {
    client.query('SELECT * FROM test', (err, result) => {
      console.log('모바일조회결과:', result)
      if (result.rows.length == 0 || result.rows[0].mobile_token == null) {
        client.query(
          "INSERT INTO test(mobile_token) VALUES('" +
            req.body.mobile_token +
            "')",
          (err, result) => {
            res.send(result)
          }
        )
      }
    })
  }
})

module.exports = {
  path: '/api',
  handler: app,
}
