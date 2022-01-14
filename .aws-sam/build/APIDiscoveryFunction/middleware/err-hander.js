const util = require('util')
const logger = require('../log')
const NODE_ENVIRONMENT = process.env.NODE_ENV || 'development'

module.exports = () => {
  return (error, request, response, next) => {
    const errorMessage = _getErrorMessage(error)
    // write log
    _logErrorMessage(errorMessage)

    const errorResponse = {
      statusCode: _getHttpStatusCode({ error, response }),
      body: undefined,
    }

    if (NODE_ENVIRONMENT !== 'production') {
      errorResponse.body = errorMessage
    }

    response.status(200)
    response.format({
      'application/json': () => {
        response.json({ status: 1, message: errorResponse.body })
      },
    })
  }
}

function _getErrorMessage(error) {
  if (error.stack) {
    return error.stack
  }

  if (typeof error.toString === 'function') {
    return error.toString()
  }

  return ''
}

function _logErrorMessage(error) {
  logger.error(error)
}

function _getHttpStatusCode({ error, response }) {
  /**
   * Check if the error object specifies an HTTP
   * status code which we can use.
   */
  const statusCodeFromError = error.status || error.statusCode
  if (_isErrorStatusCode(statusCodeFromError)) {
    return statusCodeFromError
  }

  const statusCodeFromResponse = response.statusCode
  if (_isErrorStatusCode(statusCodeFromResponse)) {
    return statusCodeFromResponse
  }

  return 500
}

function _isErrorStatusCode(statusCode) {
  return statusCode >= 400 && statusCode < 600
}
