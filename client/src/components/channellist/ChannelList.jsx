import { Pane, toaster } from "evergreen-ui";
import "./channellist.scss";
import Channel from "../channel/Channel";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoChannel from "../nochannel/NoChannel";
import { ChannelServices } from "../../services";
import {
  setChannels,
  setCurrentChannel,
} from "../../redux/features/channelSlice";

const ChannelList = () => {
  const userId = useSelector((state) => state.auth.user._id);
  const channels = useSelector((store) => store.channel);
  const dispatch = useDispatch();

  const setActiveChannel = (id) => () => {
    let currentId = channels.current === id ? null : id;
    dispatch(setCurrentChannel(currentId));
  };

  useEffect(() => {
    ChannelServices.getChannels()
      .then((response) => {
        dispatch(setChannels(response.data));
      })
      .catch((error) => {
        toaster.danger(error.message);
      });
  }, [dispatch]);

  return (
    <Pane overflowY="auto" height="100%">
      {channels.data.map((item, indis) => {
        return (
          <Channel
            active={item._id === channels.current ? true : false}
            onSelect={setActiveChannel(item._id)}
            data={item}
            key={item._id}
            userId={userId}
          />
        );
      })}

      {channels.data.length < 1 ? <NoChannel /> : ""}
    </Pane>
  );
};

export default ChannelList;
