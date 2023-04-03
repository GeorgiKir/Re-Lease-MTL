import React from "react";
import { useState, createContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    let userId = JSON.parse(window.sessionStorage.getItem("userId"));
    if (userId) {
      return userId;
    } else {
      return null;
    }
  });
  const loginContext = () => {
    // setCurrentUser(JSON.parse(window.sessionStorage.getItem("userId")));
  };

  const logoutContext = () => {
    setCurrentUser(null);
    window.sessionStorage.clear();
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, loginContext, logoutContext }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
