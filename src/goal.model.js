function createGoal (userId, stepTargetAchieved, cyclingTargetAchieved, swimTaregtAchieved) {
  return {
    user_id: userId,
    step_target_achieved: stepTargetAchieved,
    cycling_target_achieved: cyclingTargetAchieved,
    swim_taregt_achieved: swimTaregtAchieved
  }
}

module.exports = {
  createGoal
}
