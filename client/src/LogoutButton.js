import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { StyledNav } from "./Header";
import { SignUpBigButton } from "./LoginButton";
import { Trans, useTranslation } from "react-i18next";

const LogoutButton = () => {
  const { t, i18n } = useTranslation();
  const { logout, isAuthenticated } = useAuth0();
  const { logoutContext } = useContext(CurrentUserContext);
  const handleLogout = () => {
    logoutContext();
    logout();
  };

  return (
    isAuthenticated && (
      <StyledNav onClick={() => handleLogout()}>{t("header.logout")}</StyledNav>
    )
  );
};

export default LogoutButton;
