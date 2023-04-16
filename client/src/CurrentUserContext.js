import React from "react";
import { useState, createContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [verificationState, setVerificationState] = useState("Initial");
  const [logoutState, setLogoutState] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    let userId = JSON.parse(window.sessionStorage.getItem("userId"));
    if (userId) {
      return userId;
    } else {
      return null;
    }
  });
  const loginContext = () => {
    // setVerificationState("Checking");
    // setCurrentUser(JSON.parse(window.sessionStorage.getItem("userId")));
    // console.log(user);
  };

  const logoutContext = () => {
    // setVerificationState("Initial");
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

        // verificationState,
        // setVerificationState,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
