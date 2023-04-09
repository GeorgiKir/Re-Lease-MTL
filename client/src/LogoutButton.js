import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { StyledNav } from "./Header";
import { SignUpBigButton } from "./LoginButton";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  const { logoutContext } = useContext(CurrentUserContext);
  const handleLogout = () => {
    logoutContext();
    logout();
  };

  return (
    isAuthenticated && (
      <StyledNav onClick={() => handleLogout()}>Log Out</StyledNav>
    )
  );
};

export default LogoutButton;
