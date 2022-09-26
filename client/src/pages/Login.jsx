import {
  Button,
  Heading,
  IssueIcon,
  Link,
  Pane,
  Paragraph,
  TextInputField,
  toaster,
} from "evergreen-ui";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/authSlice";
import Helpers from "../utils/Helpers";
import { useState } from "react";
import { UserServices } from "../services";
//import io from "../utils/socket";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const loginHandler = (e) => {
    e.preventDefault();
    setErrors({});
    const loginCredentials = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };

    UserServices.login(loginCredentials)
      .then((response) => {
        dispatch(login(response));
        //io.connect();
        navigate("/");
      })
      .catch((error) => {
        if (error.errors.length) {
          setErrors(Helpers.validationErrorHandler(error.errors));
        } else {
          toaster.danger(error.message, { duration: 2 });
        }
      });
  };

  return (
    <Pane
      display="flex"
      padding={16}
      background="#edeff0"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <form onSubmit={loginHandler}>
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
              Login
            </Heading>

            <TextInputField
              label=""
              spellCheck={false}
              inputHeight={40}
              placeholder="Email adress"
              marginBottom={10}
              name="email"
              autoComplete="off"
              isInvalid={errors.email ? true : false}
              validationMessage={errors.email?.msg || false}
            />
            <TextInputField
              label=""
              inputHeight={40}
              placeholder="Password"
              name="password"
              type="password"
              isInvalid={errors.password ? true : false}
              validationMessage={errors.password?.msg || false}
            />
            <Pane
              display="flex"
              flexDirection="row"
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <Pane>
                <Link
                  cursor="pointer"
                  color="neutral"
                  onClick={(e) => navigate("/forgotpassword")}
                >
                  I forgot my password
                </Link>
              </Pane>
              <Pane>
                <Button intent="success" appearance="primary" type="submit">
                  Login
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
                If you don't have an account yet please sign up before.
                <Link
                  cursor="pointer"
                  marginLeft={10}
                  onClick={() => navigate("/register")}
                >
                  Register here.
                </Link>
              </Paragraph>
            </Pane>
          </Pane>
        </Pane>
      </form>
    </Pane>
  );
};

export default Login;
