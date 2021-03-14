const ProductsDAL = require('../DAL/ProductsDAL')
const LotsDAL = require('../DAL/LotsDAL')
const SalesDAL = require('../DAL/SalesDAL')

const addProductLot = async (product_id, { quantity, expiry }, db) => {
  const productsDal = new ProductsDAL(db)
  const product = await productsDal.getProduct(product_id)
  if (product) {
    const lotsDAL = new LotsDAL(db)
    await lotsDAL.addLot(product_id, quantity, expiry)
  } else {
    throw new Error('Invalid product_id')
  }
}

const sellProduct = async (product_id, body, db) => {
  let quantity = body.quantity
  const productsDal = new ProductsDAL(db)
  const product = await productsDal.getProduct(product_id)
  if (product) {
    const lotsDAL = new LotsDAL(db)
    const current = await lotsDAL.getLotStats(product_id)
    if (current.quantity < quantity) throw new Error('Not enough products')
    const lots = await lotsDAL.getAllLots(product_id)
    for (let lot of lots) {
      const reduce = lot.quantity >= quantity ? quantity : lot.quantity
      await lotsDAL.reduceLot(lot.id, reduce)
      quantity -= reduce
      if (quantity <= 0) break
    }
    await lotsDAL.unlockAllLots(product_id)
    const salesDAL = new SalesDAL(db)
    await salesDAL.addSale(product_id, body.quantity)
  } else {
    throw new Error('Invalid product_id')
  }
}

const getProductQuantity = async (product_id, db) => {
  const productsDal = new ProductsDAL(db)
  const product = await productsDal.getProduct(product_id)
  if (product) {
    const lotsDAL = new LotsDAL(db)
    return await lotsDAL.getLotStats(product_id)
  } else {
    throw new Error('Invalid product_id')
  }
}

module.exports = {
  addProductLot,
  sellProduct,
  getProductQuantity
}