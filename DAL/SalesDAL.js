class SalesDAL {
  constructor (db) {
    this.pool = db
  }

  async addSale (product_id, quantity) {
    const query = 'INSERT INTO `sales` (`product_id`, `quantity`, `created_date`) VALUES (?, ?, ?)'
    const con = await this.pool.getConnection()
    await con.query(query, [product_id, quantity, Date.now()])
    con.release()
  }
}

module.exports = SalesDAL