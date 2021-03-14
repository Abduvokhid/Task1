const { body } = require('express-validator')

const addValidator = [
  body('quantity').exists().withMessage('Quantity of the lot must be specified').isInt().withMessage('Quantity must be number'),
  body('expiry').exists().withMessage('Expiry date of the lot must be specified').isInt().withMessage('Expiry date must be number').custom(value => new Date(parseInt(value)) > new Date()).withMessage('Expiry date cannot be in the past')
]

const sellValidator = [
  body('quantity').exists().withMessage('Quantity of the lot must be specified').isInt().withMessage('Quantity must be number').custom(value => parseInt(value) > 0).withMessage('Quantity must be more than zero')
]

module.exports = {
  addValidator,
  sellValidator
}