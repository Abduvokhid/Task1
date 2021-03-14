const cron = require('node-cron')

const db = require('./config/db')
const clearExpired = require('./jobs/clearExpired')

const connection = db.init()

cron.schedule('*/5 * * * * *', async () => {
  await clearExpired(connection)
})