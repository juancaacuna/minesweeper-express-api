module.exports = function SendResponse(response, message, statusCode, statusMessage, data) {
  const res = { status: statusMessage }
  if (data) {
    res.data = data
  }
  res.message = message
  response.status(statusCode)
    .json(res)
  return
}