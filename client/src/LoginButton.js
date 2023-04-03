import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import { StyledNav } from "./Header";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { loginContext } = useContext(CurrentUserContext);
  const handleLogin = () => {
    loginContext();
    loginWithRedirect();
  };

  return (
    !isAuthenticated && (
      <StyledNav onClick={() => handleLogin()}>LOG IN/ SIGN UP</StyledNav>
    )
  );
};

export default LoginButton;
