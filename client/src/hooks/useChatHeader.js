import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setRecipients, removeChannel } from "../redux/features/channelSlice";
import { ChannelServices } from "../services";

const useChatHeader = (channel, userId) => {
  const dispatch = useDispatch();
  const [leaveConfirm, setLeaveConfirm] = useState(false);
  const [detail, setDetail] = useState(null);

  const setDetailHandler = () => {
    if (channel.isGroup) {
      setDetail(channel);
    } else {
      const recipients = [...channel.recipients];
      const contact = recipients.filter((r) => r !== userId);
      // if the channel reciviers turn the user object then set directly object, not the id
      setDetail(contact[0]);
    }
  };

  const leaveHandler = () => {
    const recipients = [...channel.recipients];
    const userIndex = recipients.indexOf(userId);
    if (userIndex >= 0) {
      recipients.splice(userIndex, 1);

      const obj = { channelId: channel._id, recipients: recipients };
      ChannelServices.setRecipients(obj)
        .then(() => {
          dispatch(removeChannel(obj.channelId));
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setLeaveConfirm(false);
  };

  useEffect(() => {
    setDetail(null);
  }, [channel._id]);

  return {
    leaveConfirm,
    setLeaveConfirm,
    detail,
    setDetail,
    setDetailHandler,
    leaveHandler,
  };
};

export default useChatHeader;
