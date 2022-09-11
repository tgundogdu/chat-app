import { Button, Pane, Text } from "evergreen-ui";
import "./nochannel.scss";
import ChannelNotFound from "../../assets/images/no-channel.svg";

const NoChannel = () => {
  return (
    <Pane padding={20} textAlign="center" className="no-channel">
      <Pane marginBottom={20}>
        <img src={ChannelNotFound} width={100} alt="no channel found"></img>
      </Pane>
      <Text size={500} color="muted">
        There is no group or direct message
      </Text>
      {/*<Pane marginTop={30}>
        <Button>Create a chat</Button>
  </Pane> */}
    </Pane>
  );
};

export default NoChannel;
