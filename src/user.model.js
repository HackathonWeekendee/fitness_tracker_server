function createUser (name, age, dob, height, weight, stepTarget, cyclingTarget, swimTarget) {
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

module.exports = {
  createUser
}
