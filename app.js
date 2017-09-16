const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(app.router)

const db_url = `${config.db.options.protocol}${config.db.username}:${config.db.password}${config.db.options.qualifier}` 
const collections = config.db.options.collections
var db = require('mongojs')
  .connect(db_url, collections)

sequelize.sync()
  .then(() => {
    app.listen(config.PORT)
    console.log(`server started at ${config.PORT}`)
  })