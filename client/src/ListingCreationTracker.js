import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { AiOutlineLine } from "react-icons/ai";

const ListingCreationTracker = ({
  listingCreationTracker,
  visitingHoursToBeAdded,
}) => {
  useEffect(() => {
    console.log(listingCreationTracker);
  }, [listingCreationTracker]);
  return (
    <ListingTrackerContainer>
      <CounterContainer1 listingCreationTracker={listingCreationTracker}>
        1
      </CounterContainer1>
      <hr />
      <CounterContainer2 listingCreationTracker={listingCreationTracker}>
        2
      </CounterContainer2>
      <hr />
      <CounterContainer3
        listingCreationTracker={listingCreationTracker}
        visitingHoursToBeAdded={visitingHoursToBeAdded}
      >
        3
      </CounterContainer3>
    </ListingTrackerContainer>
  );
};

const CounterContainer1 = styled.div`
  border: 3px solid black;
  border-radius: 50%;
  width: 75px;
  font-size: 30px;
  margin: 0px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.listingCreationTracker > 1 ? "green" : "none"};
  color: ${(props) => (props.listingCreationTracker > 1 ? "white" : "black")};
`;
const CounterContainer2 = styled.div`
  border: 3px solid black;
  border-radius: 50%;
  width: 75px;
  font-size: 30px;
  margin: 0px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.listingCreationTracker > 2 ? "green" : "none"};
  color: ${(props) => (props.listingCreationTracker > 2 ? "white" : "black")};
`;

const CounterContainer3 = styled.div`
  border: 3px solid black;
  border-radius: 50%;
  width: 75px;
  font-size: 30px;
  margin: 0px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.listingCreationTracker > 3 || props.visitingHoursToBeAdded.length > 0
      ? "green"
      : "none"};
  color: ${(props) =>
    props.listingCreationTracker > 3 || props.visitingHoursToBeAdded.length > 0
      ? "white"
      : "black"};
`;

const ListingTrackerContainer = styled.div`
  display: flex;
  height: 75px;
  width: 70%;
  margin: 0px 0px 50px 0px;
`;
export default ListingCreationTracker;
