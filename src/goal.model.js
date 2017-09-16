const createGoal = (userId, stepTargetAchieved, cyclingTargetAchieved, swimTaregtAchieved) => {
  return {
    user_id: userId,
    step_target_achieved: stepTargetAchieved,
    cycling_target_achieved: cyclingTargetAchieved,
    swim_taregt_achieved: swimTaregtAchieved
  }
}

const getAllGoals = db => {
  return (req, res) => {
    db.goals_achieved.find((err, goals) => {
      if (err || !goals) {
        console.error('Did not receive goals')
      } else {
        // res.writeHead(200, { 'Content-Type': })
        res.send(goals)
      }
    })
  }
}

const getAllGoalsForAUser = db => {
  return (req, res) => {
    const userId = req.params['user_id']
    db.goals_achieved.find({
      user_id: userId
    }, (err, goals) => {
      if (err || !goals) {
        console.error('Did not receive goals')
      } else {
        // res.writeHead(200, { 'Content-Type': })
        res.send(goals)
      }
    })
  }
}

const getGoalByGoalId = (db, mongojs) => {
  return (req, res) => {
    const goalId = req.params['goal_id']
    db.goals_achieved.findOne({
      '_id': mongojs.ObjectId(goalId)
    }, (err, goal) => {
      if (err || !goal) {
        console.error('Did not receive any goal')
      } else {
        // res.writeHead(200, { 'Content-Type': })
        res.send(goal)
      }
    })
  }
}

const createGoalForUser = db => {
  return (req, res) => {
    const goal = createGoal(
      req.body.userId,
      req.body.step,
      req.body.cycling,
      req.body.swim
    )
    console.log(goal)

    const error = `Failed at goal creation.`

    db.goals_achieved.save(
      goal, (err, saved) => {
        if (err || !saved) {
          console.error(error)
          res.send({
            message: error
          })
        } else {
          res.send('Goal saved!')
        }
      })
  }
}

module.exports = {
  createGoal,
  getAllGoals,
  getAllGoalsForAUser,
  getGoalByGoalId,
  createGoalForUser
}
