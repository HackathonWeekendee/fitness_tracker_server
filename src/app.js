const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('../config')
const mongojs = require('mongojs')
const app = express()
const userModel = require('./user.model')
const goalModel = require('./goal.model')
const Leaderboard = require('mongoleaderboard')

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
// app.use(`${config.app.api}/${config.app.version}/`)
// app.use('api/1.0.0/')

/* connecting to database on m-lab */
const dbUrl = `${config.db.options.protocol}${config.db.username}:${config.db.password}${config.db.options.qualifier}`
const collections = config.db.options.collections
const db = mongojs(dbUrl, collections)
const leaderboardOptions = config.leaderboard.options
const leaderboard = new Leaderboard(dbUrl, leaderboardOptions)

app.get('/leaderboard', (req, res) => {
  leaderboard.get(data => {
    console.log(data)
    res.send(data)
  })
})

/* sample api */
app.get('/goals', goalModel.getAllGoals(db))
app.get('/goals/:user_id', goalModel.getAllGoalsForAUser(db))
app.get('/goal/:goal_id', goalModel.getGoalByGoalId(db, mongojs))
app.post('/goal', goalModel.createGoalForUser(db))

/* user */
app.get('/users', userModel.getAllUsers(db))
app.get('/user/:user_id', userModel.getUserByUserId(db, mongojs))
app.post('/user', userModel.createNewUser(db))

app.listen(8001)
