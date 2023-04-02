import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import bgImage from "./assets/skyscraper-bg2.jpg";
import { CurrentUserContext } from "./CurrentUserContext";

const HomePage = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();

  // console.log("current user: ", currentUser);
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("USER LOGGED IN - APP.JS");
      console.log(user.email);
      fetch(`/users/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          window.sessionStorage.setItem(
            "userId",
            JSON.stringify(data.data._id)
          );
          setCurrentUser(JSON.parse(window.sessionStorage.getItem("userId")));
        })
        .catch((e) => {
          console.log("Error: ", e);
        });
    }
  }, [user]);
  const handleNavigation = () => {
    navigate("/login");
  };
  return (
    <MainPageContainer>
      <MainPageContentDiv>
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
      </MainPageContentDiv>
    </MainPageContainer>
  );
};

const CustomSignInButton = styled.button`
  border: 5px solid white;
  border-radius: 15px;
  color: white;
  font-size: 25px;
  width: 35%;
  font-family: Norwester;
  height: 10%;
  background: none;
  cursor: pointer;
`;
const InfoTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 80px;
  justify-content: space-around;
`;
const NavLinkDiv = styled.div`
  font-size: 35px;
  margin-top: 70px;
  display: flex;
  justify-content: space-between;
`;
const NameDiv = styled.div`
  font-size: 120px;
  justify-self: flex-end;
  border-bottom: 5px solid black;
  margin-top: 15px;
  width: fit-content;
  height: fit-content;
  display: flex;
  margin-right: 50px;
`;
const MainInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40%;
  height: 80%;
`;
const MainPageContentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px auto;
  width: 75vw;
  height: 90vh;
`;

const MainPageContainer = styled.div`
  height: 100vh;
  background-image: url(${bgImage});
  background-size: cover;
  margin-top: -30px;
`;
export default HomePage;
