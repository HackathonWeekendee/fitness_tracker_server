const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('../config')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

/* connecting to database on m-lab */
const dbUrl = `${config.db.options.protocol}${config.db.username}:${config.db.password}${config.db.options.qualifier}`
const collections = config.db.options.collections
const db = require('mongojs')(dbUrl, collections)

/* sample api */
app.get('/getUsers', (req, res) => {
  db.user.find((err, users) => {
    if (err || !users) {
      console.error('Did not receive users')
    } else {
      // res.writeHead(200, { 'Content-Type': })
      res.send(users)
    }
  })
})

app.listen(8001)
