const LotsDAL = require('../DAL/LotsDAL')

module.exports = async (db) => {
  const lotsDAL = new LotsDAL(db)
  await lotsDAL.clearLots()
}