import { Pane } from "evergreen-ui";
import { useSelector } from "react-redux";
import {
  Userbar,
  Chat,
  SplashScreen,
  ChannelList,
  NewChannel,
  Search,
} from "../components";

const Main = () => {
  const currentChannelId = useSelector((state) => state.channel.current);
  return (
    <Pane
      display="flex"
      padding={50}
      background="#edeff0"
      height="100%"
      alignItems="stretch"
      justifyContent="center"
    >
      <Pane
        display="flex"
        borderRadius={5}
        width="100%"
        elevation={2}
        maxWidth={960}
        background="#FFFFFF"
        className="animate-zoom-in"
        alignItems="stretch"
        overflow="hidden"
      >
        <Pane
          width={320}
          background="#FFFFFF"
          display="flex"
          flexDirection="column"
          borderRight="solid 1px #DBE2EF"
          position="relative"
        >
          <Userbar />
          <Search />
          <ChannelList />
          <NewChannel />
        </Pane>
        <Pane flex={1}>
          {currentChannelId ? (
            <Chat channelId={currentChannelId} />
          ) : (
            <SplashScreen />
          )}
        </Pane>
      </Pane>
    </Pane>
  );
};

export default Main;
