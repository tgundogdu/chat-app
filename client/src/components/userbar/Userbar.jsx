import { useState } from "react";

import {
  Avatar,
  CrossIcon,
  Heading,
  IconButton,
  Pane,
  Position,
  Text,
  Tooltip,
} from "evergreen-ui";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/authSlice";
import UserDetail from "../userdetail/UserDetail";

const Userbar = () => {
  const [isProfileShown, setIsProfileShown] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <>
      <Pane
        display="flex"
        padding={10}
        background="#F9F7F7"
        flexDirection="row"
        alignItems="center"
        borderBottom="solid 1px #DBE2EF"
        cursor="pointer"
      >
        <Pane onClick={() => setIsProfileShown(true)}>
          <Avatar display="block" name={user.name} size={40} marginRight={16} />
        </Pane>
        <Pane flex={1} onClick={() => setIsProfileShown(true)}>
          <Pane>
            <Text size={300}>{user._id}</Text>
            <Heading size={500}>{user.name}</Heading>
          </Pane>
        </Pane>
        <Pane onClick={logOut}>
          <Tooltip content="Log Out" position={Position.LEFT}>
            <IconButton icon={CrossIcon} appearance="minimal" />
          </Tooltip>
        </Pane>
      </Pane>

      {isProfileShown ? (
        <UserDetail user={user} onClose={() => setIsProfileShown(false)} />
      ) : (
        ""
      )}
    </>
  );
};

export default Userbar;
