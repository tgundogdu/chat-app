class Helpers {
  static validationErrorHandler = (errors = []) => {
    let errorObj = {};
    errors.forEach((element) => {
      if (!errorObj[element.param]) {
        errorObj[element.param] = element;
      }
    });

    return errorObj;
  };

  /* static messageInfoHandler = (msg) => {
    const sender = msg.sender._id || msg.sender;
    const sent = 0;
    const delivered = 0;
    const read = 0;
    const total = msg.info.length;

    for (const receiver of msg.info) {
      if (receiver.receiverId !== sender) {
        if (msg.info.sentDate) {
          sent++;
        }
        if (msg.info.deliveredDate) {
          delivered++;
        }
        if (msg.info.readDate) {
          read++;
        }
      }
    }
    if (read === total) {
      return "readed";
    } else if (delivered === total) {
      return "delivered";
    } else {
      return "sended";
    }
  }; */
}

export default Helpers;
