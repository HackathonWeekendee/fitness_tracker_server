const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('../config')
const mongojs = require('mongojs')
const app = express()
const userModel = require('./user.model')
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
// app.use(`${config.app.api}/${config.app.version}/`)
// app.use('api/1.0.0/')

/* connecting to database on m-lab */
const dbUrl = `${config.db.options.protocol}${config.db.username}:${config.db.password}${config.db.options.qualifier}`
const collections = config.db.options.collections
const db = mongojs(dbUrl, collections)

/* sample api */
app.get('/users', (req, res) => {
  db.user.find((err, users) => {
    if (err || !users) {
      console.error('Did not receive users')
    } else {
      // res.writeHead(200, { 'Content-Type': })
      res.send(users)
    }
  })
})

app.get('/user/:user_id', (req, res) => {
  const userId = req.params['user_id']
  db.user.findOne({
    '_id': mongojs.ObjectId(userId)
  }, (err, user) => {
    if (err || !user) {
      const error = `Cannot find user with given id: ${userId}`
      console.error(error)
      res.end({
        message: error
      })
    } else {
      console.log(`User fetched for id ${userId}: ${user}`)
      res.send(user)
    }
  })
})

app.post('/user', (req, res) => {
  const user = userModel.createUser(
    req.body.name,
    req.body.age,
    req.body.dob,
    req.body.height,
    req.body.weight,
    req.body.step_target,
    req.body.cycling_target,
    req.body.swim_target
  )
  console.log(user)

  const error = `Failed at user creation.`

  db.user.save(
    user, (err, saved) => {
      if (err || !saved) {
        console.error(error)
        res.send({
          message: error
        })
      } else {
        res.send('User saved!')
      }
    })
})

app.listen(8001)