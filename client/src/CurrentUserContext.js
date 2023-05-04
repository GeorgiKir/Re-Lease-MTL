import React, { createContext, useState } from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [logoutState, setLogoutState] = useState(false);
  const [loginState, setLoginState] = useState(false);

  const [currentUser, setCurrentUser] = useState(() => {
    let userId = JSON.parse(window.sessionStorage.getItem("userId"));
    if (userId) {
      return userId;
    } else {
      return null;
    }
  });
  const loginContext = () => {};

  const logoutContext = () => {
    setLogoutState(true);
    window.sessionStorage.clear();
    setCurrentUser(null);
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loginContext,
        logoutContext,
        logoutState,
        loginState,
        setLoginState,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
