const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('../config')
const mongojs = require('mongojs')
const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

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
  const user = {
    name: req.body.name,
    age: req.body.age,
    dob: req.body.dob,
    height: req.body.height,
    weight: req.body.weight,
    step_target: req.body.step_target,
    cycling_target: req.body.cycling_target,
    swim_target: req.body.swim_target
  }
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
