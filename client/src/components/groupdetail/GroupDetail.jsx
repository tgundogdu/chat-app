import {
  Alert,
  Avatar,
  Button,
  Dialog,
  Heading,
  Pane,
  Paragraph,
} from "evergreen-ui";
import useGroupDetail from "../../hooks/useGroupDetail";
import UserItem from "../useritem/UserItem";
import DefaultGroupAvatar from "../../assets/images/group-avatar.png";
import { useState } from "react";
import Confirmation from "../confirmation/Confirmation";
import UserLookup from "../userlookup/UserLookup";

const GroupDetail = ({ group, onClose }) => {
  const [confirm, setConfirm] = useState(null);
  const {
    isAdmin,
    users,
    remove,
    updateRecipients,
    userLookup,
    setUserLookup,
  } = useGroupDetail(group._id);

  const onConfirm = () => {
    remove(confirm);
    setConfirm(null);
  };

  const addUsersToGroup = (users) => {
    updateRecipients(users);
  };

  return (
    <>
      <Dialog
        isShown={true}
        confirmLabel="Close"
        hasCancel={false}
        width={500}
        hasHeader={false}
        onCloseComplete={onClose}
      >
        <Pane width="100%" backgroundColor="#FFF">
          <Pane textAlign="center" marginTop={30}>
            <Avatar
              name={group.name}
              size={80}
              src={
                group.isGroup && !group.avatar
                  ? DefaultGroupAvatar
                  : group.avatar
              }
            />
          </Pane>
          <Pane textAlign="center" marginTop={10}>
            <Heading size={700}>{group.name}</Heading>
            <Paragraph lineHeight={1.3}>{group.description}</Paragraph>
          </Pane>
          {isAdmin ? (
            <Alert
              intent="success"
              title="You are group admin. You can make changes in this group."
              marginBottom={16}
              marginTop={16}
            ></Alert>
          ) : (
            ""
          )}
          <Pane>
            <Pane
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderRadius={4}
              paddingBottom={10}
            >
              <Pane>
                <Heading size={400}>{users.length} recipients</Heading>
              </Pane>
              <Pane>
                {isAdmin ? (
                  <Button size="small" onClick={() => setUserLookup(true)}>
                    Add recipient
                  </Button>
                ) : (
                  ""
                )}
              </Pane>
            </Pane>
            {users.map((user) => {
              return (
                <UserItem
                  key={user._id}
                  user={user}
                  onDelete={isAdmin ? () => setConfirm(user._id) : null}
                />
              );
            })}
          </Pane>
        </Pane>
      </Dialog>
      {confirm ? (
        <Confirmation
          intent="danger"
          onConfirm={onConfirm}
          onClose={() => setConfirm(null)}
        >
          Are you sure want to remove this user from the gorup?
        </Confirmation>
      ) : (
        ""
      )}

      {userLookup ? (
        <UserLookup
          multiple
          defaultSelected={users}
          onConfirm={addUsersToGroup}
          onClose={() => setUserLookup(false)}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default GroupDetail;
