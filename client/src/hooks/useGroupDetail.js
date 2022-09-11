import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChannelServices, UserServices } from "../services";
import { setRecipients } from "../redux/features/channelSlice";

const useGroupDetail = (groupId) => {
  const [userLookup, setUserLookup] = useState(false);
  const [users, setUser] = useState([]);
  const userId = useSelector((state) => state.auth.user._id);
  const group = useSelector((state) => {
    return state.channel.data.find((item) => item._id === groupId);
  });
  const isAdmin = userId === group.createdBy ? true : false;
  const dispatch = useDispatch();

  const remove = (id) => {
    const newRecipients = group.recipients.filter((r) => r !== id);
    const obj = { channelId: groupId, recipients: newRecipients };

    ChannelServices.setRecipients(obj)
      .then(() => {
        dispatch(setRecipients(obj));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateRecipients = (users) => {
    const obj = { channelId: groupId, recipients: users };
    ChannelServices.setRecipients(obj)
      .then(() => {
        dispatch(setRecipients(obj));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    UserServices.userList(group.recipients)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [group.recipients]);

  return { isAdmin, users, remove, updateRecipients, userLookup, setUserLookup };
};

export default useGroupDetail;
