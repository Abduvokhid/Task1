class ProductsDAL {
  constructor (db) {
    this.pool = db
  }

  async getProduct (product_id) {
    const query = 'SELECT * FROM `products` WHERE `id` = ? LIMIT 1'
    const con = await this.pool.getConnection()
    const [result] = await con.query(query, [product_id])
    con.release()
    return result[0]
  }
}

module.exports = ProductsDAL