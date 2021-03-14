class LotsDAL {
  constructor (db) {
    this.pool = db
  }

  async addLot (product_id, quantity, expiry) {
    const query = 'INSERT INTO `lots` (`product_id`, `quantity`, `expire_date`, `created_date`) VALUES (?, ?, ?, ?)'
    const con = await this.pool.getConnection()
    await con.query(query, [product_id, quantity, expiry, Date.now()])
    con.release()
  }

  async getLotStats (product_id) {
    const query = 'SELECT SUM(`quantity`) as quantity, MIN(`expire_date`) as validTill FROM `lots` WHERE `product_id` = ? AND `quantity` > 0'
    const con = await this.pool.getConnection()
    const [result] = await con.query(query, [product_id])
    con.release()
    return result[0]
  }

  async getAllLots (product_id) {
    const query = 'SELECT * FROM `lots` WHERE `product_id` = ? AND `quantity` > 0 ORDER BY `expire_date` ASC FOR UPDATE'
    const con = await this.pool.getConnection()
    const [result] = await con.query(query, [product_id])
    con.release()
    return result
  }

  async reduceLot (product_id, quantity) {
    const query = 'UPDATE `lots` SET `quantity` = `quantity` - ? WHERE `id` = ?'
    const con = await this.pool.getConnection()
    await con.execute(query, [quantity, product_id])
    con.release()
  }

  async unlockAllLots (product_id) {
    const query = 'UPDATE `lots` SET `quantity` = `quantity` WHERE `product_id` = ?'
    const con = await this.pool.getConnection()
    await con.execute(query, [product_id])
    con.release()
  }

  async clearLots () {
    const query = 'UPDATE `lots` SET `quantity` = 0 WHERE `expire_date` <= ?'
    const con = await this.pool.getConnection()
    await con.execute(query, [Date.now()])
    con.release()
  }
}

module.exports = LotsDAL