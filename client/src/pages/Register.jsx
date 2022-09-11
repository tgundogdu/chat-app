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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserServices } from "../services";
import Helpers from "../utils/Helpers";

const Register = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const registerHandler = (e) => {
    e.preventDefault();
    setErrors({});
    const registerData = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      passwordConfirmation: e.target.elements.passwordConfirmation.value,
    };

    UserServices.register(registerData)
      .then((response) => {
        toaster.success("Your register is successfully! You can login now.");
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
      <form onSubmit={registerHandler}>
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
              Register
            </Heading>

            <TextInputField
              label=""
              spellCheck={false}
              inputHeight={40}
              placeholder="Name *"
              marginBottom={10}
              name="name"
              isInvalid={errors.name ? true : false}
              validationMessage={errors.name?.msg || false}
            />
            <TextInputField
              label=""
              spellCheck={false}
              inputHeight={40}
              placeholder="Email adress *"
              marginBottom={10}
              name="email"
              isInvalid={errors.email ? true : false}
              validationMessage={errors.email?.msg || false}
            />
            <TextInputField
              label=""
              marginBottom={10}
              inputHeight={40}
              placeholder="Password *"
              name="password"
              type="password"
              isInvalid={errors.password ? true : false}
              validationMessage={errors.password?.msg || false}
            />
            <TextInputField
              label=""
              inputHeight={40}
              placeholder="Password Confirm *"
              name="passwordConfirmation"
              type="password"
              isInvalid={errors.passwordConfirmation ? true : false}
              validationMessage={errors.passwordConfirmation?.msg || false}
            />
            <Pane
              display="flex"
              flexDirection="row"
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <Pane></Pane>
              <Pane>
                <Button intent="success" appearance="primary">
                  Register
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
                top={2}
              />
            </Pane>
            <Pane>
              <Paragraph size={400} color="muted">
                If you already have an account
                <Link
                  cursor="pointer"
                  marginLeft={10}
                  onClick={() => navigate("/login")}
                >
                  Login here.
                </Link>
              </Paragraph>
            </Pane>
          </Pane>
        </Pane>
      </form>
    </Pane>
  );
};

export default Register;
