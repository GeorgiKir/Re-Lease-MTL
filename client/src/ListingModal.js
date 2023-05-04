import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GrClose } from "react-icons/gr";
import { TbCalendarOff } from "react-icons/tb";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import { StyledDeleteButton } from "./DeleteListingButton";

const ListingModal = ({ listingInfo, setShowListingModal }) => {
  const { t, i18n } = useTranslation();
  const { currentUser } = useContext(CurrentUserContext);

  const [targetVistingTime, setTargetVisitingTime] = useState({
    visitorId: currentUser._id,
    visitId: "",
    listingId: listingInfo._id,
  });
  const [targetDate, setTargetDate] = useState(null);
  const [targetVisitArray, setTargetVisitArray] = useState(null);
  const [checkIfAlreadyHasVisit, setCheckifAlreadyHasVisit] = useState(false);
  const [visitConfirmMsg, setVisitConfirmMsg] = useState(null);
  const [checkAvailablityOfVisits, setCheckAvailablityOfVisits] =
    useState(false);
  const currentDateChecker = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetch(`/timeSlots/ownerId/${listingInfo._id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setTargetVisitArray(
            data.data
              .filter((item) => {
                if (item._id >= currentDateChecker) {
                  return item;
                }
              })
              .sort((a, b) => new Date(a._id) - new Date(b._id))
          );

          data.data.forEach((item) => {
            item.timeslots.map((element) => {
              if (element.visitorId === currentUser._id) {
                setCheckifAlreadyHasVisit(true);
              }
              if (element.isAvailable) {
                setCheckAvailablityOfVisits(true);
              }
            });
          });
        }
      });
  }, []);

  const handleTargetDateChange = (value, name) => {
    setTargetVisitingTime({ ...targetVistingTime, [name]: value });
    setTargetDate(value);
  };

  const handleListingModalSubmit = (e) => {
    e.preventDefault();
    // setShowListingModal(false);
    setTargetVisitArray(null);

    fetch(`/listings/reserveAVisitTime`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(targetVistingTime),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.status === 200) {
          setVisitConfirmMsg("Your visit has been successfully booked.");
        } else {
          setVisitConfirmMsg("Unable to complete booking.");
        }
      })
      .catch((e) => {
        console.log("Error: ", e);
      });
  };
  return (
    <ListingModalContainer>
      <ListingInfoContainer>
        <GrClose
          style={{
            cursor: "pointer",
            fontSize: "35px",
            position: "absolute",
          }}
          onClick={() => {
            setShowListingModal(false);
            setTargetVisitArray(null);
          }}
        />
        <StyledVisitorForm>
          <h2>{t("listingModal.address")}</h2>
          <p>
            {listingInfo.listingAddress} {listingInfo.borough}{" "}
            {listingInfo.postalCode}
          </p>
          <h2>{t("listingModal.price")}</h2>
          <p>{listingInfo.price} $</p>
          <h2>{t("listingModal.Bedrooms")}</h2>
          <p>
            {listingInfo.numBDR} {t("listingModal.bedrooms")}
          </p>
          <h2>Description</h2>
          <p>{listingInfo.listingDescription}</p>
          {visitConfirmMsg && (
            <p style={{ color: "#00abe4", fontSize: "20px" }}>
              {visitConfirmMsg}
            </p>
          )}
          {targetVisitArray &&
            targetVistingTime.listingId !== targetVistingTime.visitorId &&
            !checkIfAlreadyHasVisit &&
            checkAvailablityOfVisits &&
            targetVisitArray.length > 0 && (
              <ListingModalForm
                onSubmit={(e) => {
                  handleListingModalSubmit(e);
                }}
              >
                <h1>{t("listingModal.visitingSchedule")}</h1>
                <div>
                  {targetVisitArray.map((item) => {
                    // if (item._id >= currentDateChecker) {
                    return (
                      <>
                        <h2>{item._id}</h2>
                        <VisitingTimeslotsContainer>
                          {item.timeslots.map((element) => {
                            if (element.isAvailable) {
                              return (
                                <div>
                                  <input
                                    required
                                    type="radio"
                                    name="selectedTime"
                                    onChange={() => {
                                      setTargetVisitingTime({
                                        ...targetVistingTime,
                                        visitId: element._id,
                                      });
                                    }}
                                  />
                                  <label>{element.hour}</label>
                                </div>
                              );
                            }
                          })}
                        </VisitingTimeslotsContainer>
                      </>
                    );
                    // }
                  })}
                </div>

                <StyledDeleteButton
                  style={{
                    display: "block",
                    padding: "5px 10px",
                    fontSize: "20px",
                  }}
                  type="submit"
                >
                  {t("buttons.submit")}
                </StyledDeleteButton>
              </ListingModalForm>
            )}
          {targetVisitArray &&
            targetVistingTime.listingId === targetVistingTime.visitorId && (
              <p>{t("listingModal.yourListing")}</p>
            )}
          {targetVisitArray &&
            targetVistingTime.listingId !== targetVistingTime.visitorId &&
            checkIfAlreadyHasVisit && (
              <p>{t("listingModal.alreadyHaveVisit")}</p>
            )}
          {(targetVisitArray &&
            !checkAvailablityOfVisits &&
            !checkIfAlreadyHasVisit) ||
            (targetVisitArray && targetVisitArray.length == 0 && (
              <div
                style={{
                  margin: "0px auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "25px",
                }}
              >
                <TbCalendarOff
                  style={{
                    fontSize: "40px",
                  }}
                />
                <p>{t("listingModal.noMoreVisits")}</p>
              </div>
            ))}
          {/* {targetVisitArray && targetVisitArray.length == 0 && (
            <div
              style={{
                margin: "0px auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <FaRegSadCry
                style={{
                  fontSize: "40px",
                }}
              />
              <p>{t("listingModal.noMoreVisits")}</p>
            </div>
          )} */}
        </StyledVisitorForm>
      </ListingInfoContainer>
    </ListingModalContainer>
  );
};

const VisitingTimeslotsContainer = styled.div`
  @media (min-width: 768px) {
    width: 80%;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
  display: flex;
  flex-wrap: wrap;
  margin: 20px auto;
  gap: 10px;
`;

const ListingModalForm = styled.form`
  margin: 25px 0px 25px 0px;
`;

const StyledVisitorForm = styled.div`
  @media (min-width: 768px) {
    & h1 {
      font-weight: 600;
      font-size: 20px;
      margin-bottom: 20px;
    }
    & h2 {
      color: #00abe4;
      font-size: 20px;
      font-weight: 500;
      border-bottom: 1px solid gray;
    }
    & p {
      font-size: 18px;
      margin: 15px 0px;
    }
    & label {
      font-size: 20px;
      margin-bottom: 5px;
    }
  }
  @media (max-width: 767px) {
    & h1 {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 10px;
    }
    & h2 {
      color: #00abe4;
      font-size: 18px;
      font-weight: 500;
      border-bottom: 1px solid gray;
    }
    & p {
      font-size: 15px;
      margin: 15px 0px;
    }
    & label {
      font-size: 13px;
      margin-bottom: 0px;
      font-weight: 500;
    }
  }
  display: flex;
  margin: 5% auto;
  flex-direction: column;
  justify-content: space-between;
  width: 75%;
  height: fit-content;
`;

const ListingInfoContainer = styled.div`
  @media (min-width: 768px) {
    width: 60%;
  }
  @media (max-width: 767px) {
    width: 90%;
  }
  overflow-y: scroll;
  position: relative;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  color: black;
  background-color: #faf9f6;
  height: 95%;
  z-index: 6;
  & p {
    line-height: 1.3;
  }
`;
const ListingModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.7);
`;

export default ListingModal;
