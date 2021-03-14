const express = require('express')
require('express-async-errors')

const errorHandler = require('./utils/errorHandler')
const db = require('./config/db')
const connectDB = require('./middlewares/connectDB')

// region Configurations and middlewares
const app = express()
app.set('trust proxy', 1)
app.use(express.json())
app.use(connectDB(db.init()))
// endregion

// region Routes
app.use('/', require('./routes/api/product'))
// endregion

// region Error handlers
app.use(async (err, req, res, _) => {
  await errorHandler(err, res)
})

process.on('uncaughtException', error => {
  errorHandler(error)
})

process.on('unhandledRejection', (reason) => {
  errorHandler(reason)
})
// endregion

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))