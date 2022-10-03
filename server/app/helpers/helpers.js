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

const normalizeData = (key, data) =>{
  let newData = {};
  try {
    data.forEach(item => {
      newData[item[key]] = item;
    });
  } catch (error) {
    throw "Data normalized error";
  }

  return newData;
}

export { errResponse, normalizeData };
