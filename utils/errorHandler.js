const errorHandler = async function errorHandler (error, responseStream) {
  if (responseStream) {
    await responseStream.json({
      error: error.message || 'Something went wrong'
    })
  }
}

module.exports = errorHandler