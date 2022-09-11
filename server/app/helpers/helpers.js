const errResponse = (
  status,
  message = "",
  code = "",
  path = "",
  errors = []
) => {
  return {
    status,
    code,
    message,
    errors,
    path,
    timestamp: new Date(),
  };
};

export { errResponse };
