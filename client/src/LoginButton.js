import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import { StyledNav } from "./Header";
import { Trans, useTranslation } from "react-i18next";

const LoginButton = () => {
  const { t, i18n } = useTranslation();
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const { loginContext } = useContext(CurrentUserContext);
  const handleLogin = () => {
    loginContext();
    loginWithRedirect();
  };

  return (
    !isAuthenticated && (
      <StyledNav onClick={() => handleLogin()}>{t("header.login")}</StyledNav>
    )
  );
};

export default LoginButton;
