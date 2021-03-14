const express = require('express')

const { addProductLot, sellProduct, getProductQuantity } = require('../../controllers/product')
const validate = require('../../validators')
const { addValidator, sellValidator } = require('../../validators/productsValidator')

const router = express.Router()

router.post('/:item/add', validate(addValidator), async (req, res) => {
  const product_id = req.params.item
  await addProductLot(product_id, req.body, req.db)
  return res.json({})
})

router.post('/:item/sell', validate(sellValidator), async (req, res) => {
  const product_id = req.params.item
  await sellProduct(product_id, req.body, req.db)
  return res.json({})
})

router.get('/:item/quantity', async (req, res) => {
  const product_id = req.params.item
  const data = await getProductQuantity(product_id, req.db)
  return res.json({ quantity: parseInt(data.quantity) || 0, validTill: parseInt(data.validTill) || null })
})

module.exports = router