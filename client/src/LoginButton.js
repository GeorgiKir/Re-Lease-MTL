import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { loginContext } = useContext(CurrentUserContext);
  const handleLogin = () => {
    loginContext();
    loginWithRedirect();
  };

  return (
    !isAuthenticated && <button onClick={() => handleLogin()}>Sign In</button>
  );
};

export default LoginButton;
