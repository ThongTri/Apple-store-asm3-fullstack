const AppError = require("../appError");

exports.globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (err.name === "CastError")
      error = new AppError(`Invalid ${err.path}: ${err.value}.`, 400);
    if (err.code === 11000)
      error = new AppError(
        `This ${Object.keys(err.keyValue)[0]} : ${
          Object.values(err.keyValue)[0]
        }`,
        400
      );
    if (err.name === "ValidationError") error = new AppError(err.message, 400);
    if (error.isOperational) {
      //trusted erroror
      res
        .status(error.statusCode)
        .json({ status: error.status, message: error.message });

      //progamming or unknown error
    } else {
      res
        .status(500)
        .json({ status: "error", message: "Something went wrong!" });
    }
  }
};
