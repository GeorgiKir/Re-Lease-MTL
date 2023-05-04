import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsCalendarPlus } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import EditVisitingHoursModal from "./EditVisitingHoursModal";
import SpinnerLoading from "./SpinnerLoading";

const ListingSchedulePage = () => {
  const { t, i18n } = useTranslation();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [showVisitingHoursInProfile, setShowVisitingHoursInProfile] =
    useState(null);
  const [loadingState, setLoadingState] = useState(null);
  const [listingUserHasDeleted, setListingUserHasDeleted] = useState(false);
  const currentDateChecker = new Date().toISOString().split("T")[0];
  const [showEditModal, setShowEditModal] = useState(false);
  const [newVisitingHours, setNewVisitingHours] = useState([]);

  useEffect(() => {
    setLoadingState(true);
    fetch(`/timeSlots/ownerId/${currentUser._id}`)
      .then((res) => res.json())
      .then((data) => {
        setLoadingState(false);
        if (data.status === 200) {
          setShowVisitingHoursInProfile(
            data.data
              .filter((item) => {
                if (item._id >= currentDateChecker) {
                  return item;
                }
              })
              .sort((a, b) => new Date(a._id) - new Date(b._id))
          );
        }
      });
  }, [listingUserHasDeleted]);

  const handleDelete = (visitId) => {
    fetch(`/timeSlots/deleteVisitingHour/${visitId}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        setListingUserHasDeleted(!listingUserHasDeleted);
      });
  };
  return (
    <div>
      {showEditModal && (
        <EditVisitingHoursModal
          setShowEditModal={setShowEditModal}
          listingUserHasDeleted={listingUserHasDeleted}
          setListingUserHasDeleted={setListingUserHasDeleted}
        />
      )}
      {showVisitingHoursInProfile && (
        <>
          {currentUser.listing && (
            <CalendarSvgContainer>
              <BsCalendarPlus
                style={{ fontSize: "30px", color: "#009acd" }}
                onClick={() => {
                  setShowEditModal(true);
                }}
              />
            </CalendarSvgContainer>
          )}
          {showVisitingHoursInProfile.map((item) => {
            return (
              <>
                <h1>{item._id}</h1>
                <div
                  style={{
                    padding: "5px 0px 10px 0px",
                  }}
                >
                  {item.timeslots.map((element) => {
                    return (
                      <TimeslotContainerDiv>
                        <p style={{ padding: "5px 0px", width: "fit-content" }}>
                          {element.hour}{" "}
                          {element.isAvailable === true
                            ? `(${t("visitSchedule.available")})`
                            : `(${t("visitSchedule.booked")})`}
                        </p>
                        {element.isAvailable && (
                          <CgClose
                            onClick={() => {
                              handleDelete(element._id);
                            }}
                          />
                        )}
                      </TimeslotContainerDiv>
                    );
                  })}
                </div>
              </>
            );
          })}
        </>
      )}
      {!showVisitingHoursInProfile && !loadingState && (
        <p style={{ textAlign: "center" }}>{t("profileHeader.noListing")}</p>
      )}
      {!showVisitingHoursInProfile && loadingState && <SpinnerLoading />}
    </div>
  );
};

const CalendarSvgContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  & svg {
    &:hover {
      scale: 1.3;
    }
  }
`;

const TimeslotContainerDiv = styled.div`
  @media (max-width: 560px) {
    width: 85%;
    padding: 5px 0px;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  margin: 0px auto;
  border-radius: 5px;
  padding: 1px 10px;
  &:hover {
    cursor: pointer;
    background-color: #00abe4;
    color: white;
  }
  & svg {
    &:hover {
      scale: 2;
    }
  }
`;
export default ListingSchedulePage;
