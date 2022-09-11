import { Avatar, Dialog, Heading, Pane, Paragraph } from "evergreen-ui";
import useUserDetail from "../../hooks/useUserDetail";

const UserDetail = ({ user, onClose }) => {
  const { userObj } = useUserDetail(user);

  if (!userObj){
    return;
  }

  return (
    <Dialog
      isShown={true}
      title="User Profile"
      confirmLabel="Close"
      hasCancel={false}
      width={400}
      hasHeader={false}
      onCloseComplete={onClose}
    >
      <Pane width="100%" backgroundColor="#FFF">
        <Pane textAlign="center" marginTop={30}>
          <Avatar name={userObj.name} size={80} src={userObj.avatar} />
        </Pane>
        <Pane textAlign="center" marginTop={10}>
          <Heading size={700}>{userObj.name}</Heading>
          <Heading is="h4" size={300}>
            {userObj.email}
          </Heading>
          <Paragraph marginTop={20} lineHeight={1.3}>
            {userObj.description}
          </Paragraph>
        </Pane>
      </Pane>
    </Dialog>
  );
};

export default UserDetail;
