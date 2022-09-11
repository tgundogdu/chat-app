const useChannel = (channel, userId) => {
  let message = null;
  let time;
  let status = "";

  if (channel.messages && channel.messages.length > -1) {
    message = channel.messages[channel.messages.length - 1];
  }

  if (message) {
    time = new Date(message.createdAt);
    const senderId = message.sender._id || message.sender;
    if (senderId !== userId) {
      const lastMessageIsUnread = message.info.findIndex(
        (element) => element.receiverId === userId && element.readDate === null
      );
      if (lastMessageIsUnread > -1) {
        status = "unread";
      }
    }
  } else {
    time = new Date(channel.createdAt);
  }

  time = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { message, status, time };
};

export default useChannel;
