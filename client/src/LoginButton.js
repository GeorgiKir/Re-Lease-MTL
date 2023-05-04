import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { CurrentUserContext } from "./CurrentUserContext";
import { StyledNav } from "./Header";

const LoginButton = () => {
  const { t, i18n } = useTranslation();
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const { loginContext, setVerificationState } = useContext(CurrentUserContext);
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
