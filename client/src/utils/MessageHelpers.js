class MessageHelper {
  static chekAll(msg, userId) {
    const result = msg.info.reduce((accumulator, current) => {
      if (current.receiverId !== userId) {
        accumulator.push(this.check(current));
      }
      return accumulator;
    }, []);

    if (result.includes("sended")) return "sended";
    else if (result.includes("delivered")) return "delivered";
    else if (result.includes("readed")) return "readed";
    else return null;
  }
  static chekOne(msg, userId) {
    const obj = msg.info.find((item) => item.receiverId === userId);
    return this.check(obj);
  }

  static check(obj) {
    return obj.readDate
      ? "readed"
      : obj.deliveredDate
      ? "delivered"
      : obj.sentDate
      ? "sended"
      : null;
  }
}

export default MessageHelper
