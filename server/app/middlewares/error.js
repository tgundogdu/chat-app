const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    status: statusCode,
    //code: "CUSTOM_ERROR_CODE_HERE",
    message: err.message,
    //stack: process.env.NODE_ENV === "production" ? null : err.stack,
    errors: err.errors || [],
    path: req.originalUrl,
    timestamp: new Date(),
  });
};

export default errorHandler;
