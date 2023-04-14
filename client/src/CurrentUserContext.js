import React from "react";
import { useState, createContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [verificationState, setVerificationState] = useState("Initial");
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
    setCurrentUser(null);
    window.sessionStorage.clear();
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loginContext,
        logoutContext,

        // verificationState,
        // setVerificationState,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
