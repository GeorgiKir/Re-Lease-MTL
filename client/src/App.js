import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
import { CurrentUserContext } from "./CurrentUserContext";
import Footer from "./Footer";
import GlobalStyle from "./GlobalStyle";
import Header from "./Header";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import Profile from "./Profile";
import SearchPage from "./SearchPage";
import LogoutPage from "./LogoutPage";

function App() {
  const { user, isAuthenticated } = useAuth0();
  const {
    currentUser,
    setCurrentUser,
    verificationState,
    setVerificationState,
    logoutState,
  } = useContext(CurrentUserContext);
  // const [verificationState, setVerificationState] = useState("Initial");

  useEffect(() => {
    if (isAuthenticated && user) {
      // setVerificationState("Checking");
      // console.log(user);
      fetch(`/users/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          window.sessionStorage.setItem(
            "userId",
            JSON.stringify({
              email: data.data.email,
              _id: data.data._id,
              nickname: user.nickname,
              listing: data.data.listingInfo ? data.data.listingInfo : "",
            })
          );
          // setVerificationState("Verified");
          setCurrentUser(JSON.parse(window.sessionStorage.getItem("userId")));
        })
        .catch((e) => {
          console.log("Error: ", e);
        });
    }
  }, [user]);

  // if (verificationState === "Checking") {
  //   return <>CHECKING...</>;
  // }
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        {logoutState && <LogoutPage />}
        {!logoutState && (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/search" element={<SearchPage />} />
            {/* <Route
              path="/profile"
              element={isAuthenticated ? <Profile /> : <HomePage />}
            /> */}
            <Route path="/profile" element={<Profile />} />
          </Routes>
        )}
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
