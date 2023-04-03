import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import bgImage from "./assets/facade_1.png";
import { CurrentUserContext } from "./CurrentUserContext";

const HomePage = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();

  // console.log("current user: ", currentUser);
  // useEffect(() => {
  //   if (isAuthenticated && user) {
  //     console.log("USER LOGGED IN - APP.JS");
  //     console.log(user.email);
  //     fetch(`/users/${user.email}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         window.sessionStorage.setItem(
  //           "userId",
  //           JSON.stringify({
  //             email: data.data.email,
  //             _id: data.data._id,
  //             listing: data.data.listingInfo ? data.data.listingInfo : "",
  //           })
  //         );
  //         setCurrentUser(JSON.parse(window.sessionStorage.getItem("userId")));
  //       })
  //       .catch((e) => {
  //         console.log("Error: ", e);
  //       });
  //   }
  // }, [user]);
  const handleNavigation = () => {
    navigate("/login");
  };
  return (
    <MainPageContainer>
      <HomePageContentDiv>
        {/* {currentUser && <p>Hello, {currentUser}</p>} */}
        <HeroImageContainer>
          <h2>Reduce.</h2>
          <h2>Reuse.</h2>
          <h2>Recycle.</h2>
          <h2>Re:Lease.</h2>
        </HeroImageContainer>
      </HomePageContentDiv>
      {/* <MainPageContentDiv>
        <MainInfoDiv>
          <NavLinkDiv>
            <h1
              onClick={() => {
                handleNavigation();
              }}
            >
              Sign In
            </h1>
            <h1>Search</h1>
            <h1>About Us</h1>
          </NavLinkDiv>
          <InfoTextDiv>
            <h2>Reduce</h2>
            <h2>Reuse</h2>
            <h2>Recycle</h2>
            <h2>Re:Lease</h2>
          </InfoTextDiv>
          <CustomSignInButton>Sign Up</CustomSignInButton>
        </MainInfoDiv>
        <NameDiv>
          <h1>Re:Lease</h1>
        </NameDiv>
      </MainPageContentDiv> */}
    </MainPageContainer>
  );
};

const HeroImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${bgImage});
  width: 75%;
  height: 350px;
  margin: 35px auto 0px auto;
  background-size: 100% 100%;
  border-radius: 5px;
  & h2 {
    color: white;
    font-size: 50px;
  }
`;

const HomePageContentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px auto;
  width: 75vw;
  height: 90vh;
`;

export const MainPageContainer = styled.div`
  height: 100vh;
  /* background-image: url(${bgImage}); */
  background-size: cover;
  margin-top: 75px;
`;
export default HomePage;
