const { validationResult } = require('express-validator')

const validate = (rules) => {
  return async (req, res, next) => {
    await Promise.all(rules.map(rule => rule.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    res.status(400).json({ error: errors.array()[0].msg })
  }
}

module.exports = validate