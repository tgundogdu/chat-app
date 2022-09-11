import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserServices } from "../services";

const useMessageDetail = (msg) => {
  const [receivers, setReceivers] = useState([]);
  const userId = useSelector((state) => state.auth.user._id);
  const senderId = msg.sender?._id || msg.sender;

  //load message receivers user list
  useEffect(() => {
    const receivers = [];

    for (const receiver of msg.info) {
      if (senderId !== receiver.receiverId) {
        receivers.push(receiver.receiverId);
      }
    }
    UserServices.userList(receivers)
      .then((response) => {
        setReceivers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return { receivers, senderId };
};

export default useMessageDetail;
