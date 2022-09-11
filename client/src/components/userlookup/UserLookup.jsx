import { Dialog, Pane } from "evergreen-ui";
import useUserLookup from "../../hooks/useUserLookup";
import UserItem from "../useritem/UserItem";
import "./userlookup.scss";

const UserLookup = ({ defaultSelected = [], onClose, onConfirm, multiple }) => {
  const { users, defaultUserIds, selectedUserIds, setSelectedUser } =
    useUserLookup(defaultSelected, multiple);

  const sendUsers = () => {
    const mergedUsers = [...defaultUserIds, ...selectedUserIds];
    onConfirm(mergedUsers);
    onClose();
  };

  return (
    <Dialog
      isShown={true}
      title={`Select user${multiple ? "s" : ""}:`}
      width={500}
      onCloseComplete={onClose}
      onConfirm={sendUsers}
      confirmLabel="Select"
    >
      <Pane width="100%">
        {users.map((user) => {
          const isSelected = defaultUserIds.indexOf(user._id);
          const isActive = selectedUserIds.indexOf(user._id);
          return (
            <UserItem
              key={user._id}
              user={user}
              multiple={multiple}
              selectable
              onClick={setSelectedUser(user._id)}
              disable={isSelected >= 0 ? true : false}
              active={isActive >= 0 ? true : false}
            />
          );
        })}
      </Pane>
    </Dialog>
  );
};

export default UserLookup;
