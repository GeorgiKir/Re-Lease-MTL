import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect } from "react";
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

function App() {
  const { user, isAuthenticated } = useAuth0();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetch(`/users/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          window.sessionStorage.setItem(
            "userId",
            JSON.stringify({
              email: data.data.email,
              _id: data.data._id,
              listing: data.data.listingInfo ? data.data.listingInfo : "",
            })
          );
          setCurrentUser(JSON.parse(window.sessionStorage.getItem("userId")));
        })
        .catch((e) => {
          console.log("Error: ", e);
        });
    }
  }, [user]);

  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
