const createUserModel = (name, age, dob, height, weight, stepTarget, cyclingTarget, swimTarget) => {
  return {
    name: name,
    age: age,
    dob: dob,
    height: height,
    weight: weight,
    step_target: stepTarget,
    cycling_target: cyclingTarget,
    swim_target: swimTarget
  }
}

const getAllUsers = db => {
  return (req, res) => {
    db.user.find((err, users) => {
      if (err || !users) {
        console.error('Did not receive users')
      } else {
        // res.writeHead(200, { 'Content-Type': })
        res.send(users)
      }
    })
  }
}

const getUserByUserId = (db, mongojs) => {
  return (req, res) => {
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
  }
}

const createNewUser = db => {
  return (req, res) => {
    const user = createUserModel(
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
  }
}
module.exports = {
  createUserModel,
  getAllUsers,
  getUserByUserId,
  createNewUser
}
