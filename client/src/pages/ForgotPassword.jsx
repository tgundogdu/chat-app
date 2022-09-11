import {
  Button,
  Heading,
  IssueIcon,
  Link,
  Pane,
  Paragraph,
  TextInputField,
} from "evergreen-ui";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <Pane
      display="flex"
      padding={16}
      background="#edeff0"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Pane
        borderRadius={5}
        width={400}
        className="animate-zoom-in"
      >
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
          <Heading size={700} color="#474d66" marginBottom={10}>
            Reset Password
          </Heading>

          <Paragraph marginBottom={10}>
            Enter your email address and we’ll send you an email with
            instructions to reset your password.
          </Paragraph>

          <TextInputField
            label=""
            spellCheck={false}
            inputHeight={40}
            placeholder="Email adress"
            marginBottom={20}
          />
          <Pane
            display="flex"
            flexDirection="row"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
          >
            <Pane>
              <Link cursor="pointer" color="neutral" onClick={(e) => navigate("/login")}>
                Go back to Login
              </Link>
            </Pane>
            <Pane>
              <Button intent="success" appearance="primary">
                Reset Password
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
            <IssueIcon
              marginRight={10}
              size={20}
              color="muted"
              position="relative"
              top={5}
            />
          </Pane>
          <Pane>
            <Paragraph size={400} color="muted">
              If you don't receive an email from us within a few minutes, check
              your spam filter as sometimes they end up in there.
            </Paragraph>
          </Pane>
        </Pane>
      </Pane>
    </Pane>
  );
};

export default ForgotPassword;
