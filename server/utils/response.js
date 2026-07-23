function successResponse(res, data = null, message = 'Success', statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    error: null,
    message,
    data
  });
}

module.exports = {
  successResponse
};
