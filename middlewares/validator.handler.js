function validatorHandler(req, res, next) {
  console.log(errorHandler);
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

module.exports = validatorHandler;
