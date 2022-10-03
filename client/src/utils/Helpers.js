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

  static normalizeData = (key, data) => {
    let newData = {};
    try {
      data.forEach((item) => {
        newData[item[key]] = item;
      });
    } catch (error) {
      throw new Error("Data normalized error");
    }

    return newData;
  };

  static setReadAllMessages = (userId, messages, deepCopy = false) => {
    const unreads = [];
    let newMessages = [];
    if (deepCopy){
      newMessages = JSON.parse(JSON.stringify(messages))
    }
    else{
      newMessages = messages
    }
    if (newMessages.length) {
      for (let i = 0; i < newMessages.length; i++) {
        if (newMessages[i].sender._id !== userId) {
          const indis = newMessages[i].info.findIndex(
            (receiver) =>
              receiver.receiverId === userId && receiver.readDate === null
          );
          if (indis >= 0) {
            const tmp = {
              id: newMessages[i]._id,
              sender: newMessages[i].sender._id
            }
            unreads.push(tmp);
            newMessages[i].info[indis].readDate = new Date().toISOString();
          }
        }
      }
    }

    return {
      userId,
      unreads,
      messages: newMessages,
    };
  };
}

export default Helpers;
