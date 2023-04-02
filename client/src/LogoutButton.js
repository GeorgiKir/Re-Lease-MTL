import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  const { logoutContext } = useContext(CurrentUserContext);
  const handleLogout = () => {
    logoutContext();
    logout();
  };

  return (
    isAuthenticated && <button onClick={() => handleLogout()}>Sign Out</button>
  );
};

export default LogoutButton;
