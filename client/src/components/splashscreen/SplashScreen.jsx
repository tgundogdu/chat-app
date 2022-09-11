import { Button, Heading, Pane } from "evergreen-ui";
import noConversation from "../../assets/images/no-conversation.svg";

const SplashScreen = () => {
  return (
    <Pane
      display="flex"
      width="100%"
      height="100%"
      padding={10}
      justifyContent="center"
      alignItems="center"
      background="#F9F7F7"
    >
      <Pane padding={50} textAlign="center">
        <Pane marginBottom={30}>
          <img src={noConversation} className="no-conversation-image" alt="no conversation"/>
        </Pane>
        <Heading size={700} marginBottom={20}>MERN STACK CHAT APP</Heading>
        <Button>Start Conversation</Button>
      </Pane>
    </Pane>
  );
};

export default SplashScreen;
