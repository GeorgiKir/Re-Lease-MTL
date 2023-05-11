import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import Footer from "./Footer";
import GlobalStyle from "./GlobalStyle";
import Header from "./Header";
import HomePage from "./HomePage";

import Profile from "./Profile";
import SearchPage from "./SearchPage";
import LogoutPage from "./LogoutPage";
import ProcessingPage from "./ProcessingPage";
import SpinnerLoading from "./SpinnerLoading";

const ROOT_API = "https://re-lease-mtl.onrender.com";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [navigationState, setNavigationState] = useState("home");
  const [hasLoaded, setHasLoaded] = useState(false);
  const {
    currentUser,
    setCurrentUser,
    verificationState,
    setVerificationState,
    logoutState,
    loginState,
    setLoginState,
  } = useContext(CurrentUserContext);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetch(`${ROOT_API}/users/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          window.sessionStorage.setItem(
            "userId",
            JSON.stringify({
              email: data.data.email,
              _id: data.data._id,
              nickname: user.nickname,
              listing: data.data.listingInfo ? data.data.listingInfo : "",
            })
          );

          setCurrentUser(JSON.parse(window.sessionStorage.getItem("userId")));
        })
        .catch((e) => {
          console.log("Error: ", e);
        });
    } else {
      return;
    }
  }, [user]);

  if (!logoutState && isLoading) {
    return <SpinnerLoading />;
  }

  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        {logoutState && <LogoutPage />}
        {!logoutState && !isLoading && (
          <>
            <Header navigationState={navigationState} />
            <Routes>
              <Route
                path="/"
                element={<HomePage setNavigationState={setNavigationState} />}
              />
              <Route
                path="/search"
                element={<SearchPage setNavigationState={setNavigationState} />}
              />
              <Route
                path="/profile"
                element={<Profile setNavigationState={setNavigationState} />}
              />
            </Routes>
            <Footer />
          </>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
