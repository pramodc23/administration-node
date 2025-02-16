const successResponse = (data) => ({
    success: true,
    data,
  });
  
  const errorResponse = (message, status = 500) => ({
    success: false,
    status,
    message,
  });
  
  module.exports = { successResponse, errorResponse };
  