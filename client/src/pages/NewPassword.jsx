import {
  Button,
  Heading,
  IssueIcon,
  Link,
  Pane,
  Paragraph,
  TextInputField,
} from "evergreen-ui";

const NewPassword = () => {
  return (
    <Pane
      display="flex"
      padding={16}
      background="#edeff0"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Pane borderRadius={5} width={400} className="animate-zoom-in">
        <Heading is="h1" size={900} textAlign="center" marginBottom={20}>
          Chatter
        </Heading>
        <Pane
          elevation={1}
          padding={30}
          background="white"
          borderTopLeftRadius={5}
          borderTopRightRadius={5}
        >
          <Heading size={700} marginBottom={20} color="#474d66">
            New Password
          </Heading>

          <TextInputField
            label=""
            marginBottom={10}
            inputHeight={40}
            type="password"
            placeholder="Password"
          />
          <TextInputField
            label=""
            type="password"
            inputHeight={40}
            placeholder="Password Confirm"
          />
          <Pane
            display="flex"
            flexDirection="row"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
          >
            <Pane>
              <Link href="#" color="neutral">
                Go back to Login
              </Link>
            </Pane>
            <Pane>
              <Button intent="success" appearance="primary">
                Save
              </Button>
            </Pane>
          </Pane>
        </Pane>
        <Pane
          elevation={1}
          background="#f9fafa"
          paddingTop={20}
          paddingBottom={20}
          paddingLeft={30}
          paddingRight={30}
          borderBottomLeftRadius={5}
          borderBottomRightRadius={5}
          borderTop="1px solid #e8ebed"
          display="flex"
        >
          <Pane>
            <IssueIcon marginRight={10} position="relative" top={3} />
          </Pane>
          <Pane>
            <Paragraph size={400} color="muted">
            This token is valid for 24 hours. After that it will be passive
            </Paragraph>
          </Pane>
        </Pane>
      </Pane>
    </Pane>
  );
};

export default NewPassword;
