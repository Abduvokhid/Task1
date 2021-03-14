const connectDB = db => (req, res, next) => {
  req.db = db
  next()
}

module.exports = connectDB