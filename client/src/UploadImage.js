import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import emptyPhoto from "./assets/emptyPhoto.jpg";
import { GrClose } from "react-icons/gr";
import { ArrowContainerDiv, MobileArrowContainerDiv } from "./Profile";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

const UploadImage = ({ ListingFormInfo, setListingFormInfo }) => {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState(null);
  const [showPhotoTracker, setShowPhotoTracker] = useState(0);

  const handlePhotoTracker = (count) => {
    if (count === 1) {
      if (showPhotoTracker === ListingFormInfo.listingImage.length - 1) {
        setShowPhotoTracker(0);
      } else {
        setShowPhotoTracker((prev) => prev + 1);
      }
    } else {
      if (showPhotoTracker === 0) {
        setShowPhotoTracker(ListingFormInfo.listingImage.length - 1);
      } else {
        setShowPhotoTracker((prev) => prev - 1);
      }
    }
  };

  const handleFileInputChange = (e) => {
    // console.log(e.target.files);
    if (ListingFormInfo.listingImage.length >= 5) {
      setErrMsg("Max number of pictures reached");
    } else {
      const file = e.target.files[0];
      if (file.size > 600000) {
        console.log("File too large");
        setErrMsg("Your file is too large");
        return;
      } else {
        console.log("File size is acceptable");
        setErrMsg(null);
        const reader = new FileReader();
        reader.readAsDataURL(file);

        // setFileInputState(e.target.value);
        reader.onloadend = () => {
          if (ListingFormInfo.listingImage.length > 0) {
            setListingFormInfo({
              ...ListingFormInfo,
              listingImage: [...ListingFormInfo.listingImage, reader.result],
            });
            setShowPhotoTracker(showPhotoTracker + 1);
          } else {
            setListingFormInfo({
              ...ListingFormInfo,
              listingImage: [reader.result],
            });
          }
        };
      }
    }
  };

  return (
    <ImageInputContainer>
      {ListingFormInfo.listingImage &&
        ListingFormInfo.listingImage.length > 0 && (
          <div style={{ height: "fit-content" }}>
            <PreviewImageContainer>
              <GrClose
                style={{
                  position: "absolute",
                  zIndex: "0",
                  marginTop: "1.75%",
                  marginLeft: "4%",
                  fontSize: "25px",
                }}
                onClick={() => {
                  // setErrMsg(null);
                  setListingFormInfo({
                    ...ListingFormInfo,
                    listingImage: ListingFormInfo.listingImage.filter(
                      (item) => {
                        return (
                          item !==
                          ListingFormInfo.listingImage[showPhotoTracker]
                        );
                      }
                    ),
                  });
                  if (showPhotoTracker > 0) {
                    setShowPhotoTracker(showPhotoTracker - 1);
                  }
                }}
              />
              <ArrowContainerDiv
                style={{
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handlePhotoTracker(0);
                }}
              >
                <SlArrowLeft style={{ fontSize: "35px" }} />
              </ArrowContainerDiv>

              <img src={ListingFormInfo.listingImage[showPhotoTracker]} />
              <ArrowContainerDiv
                style={{
                  borderTopRightRadius: "5px",
                  borderBottomRightRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handlePhotoTracker(1);
                }}
              >
                <SlArrowRight style={{ fontSize: "35px" }} />
              </ArrowContainerDiv>
              <MobileArrowContainerDiv
                style={{ width: "100%", background: "transparent" }}
              >
                <SlArrowLeft
                  style={{ color: "#009acd", fontSize: "20px" }}
                  onClick={() => {
                    handlePhotoTracker(0);
                  }}
                />
                <SlArrowRight
                  style={{
                    color: "#009acd",
                    fontSize: "20px",
                  }}
                  onClick={() => {
                    handlePhotoTracker(1);
                  }}
                />
              </MobileArrowContainerDiv>
            </PreviewImageContainer>
            {/* {ListingFormInfo.listingImage.map((photo, index) => {
              return (
                <PreviewImageContainer>
                  <GrClose
                    style={{
                      position: "absolute",
                      zIndex: "0",
                      marginTop: "15px",
                      marginLeft: "5px",
                      fontSize: "25px",
                    }}
                    onClick={() => {
                      setErrMsg(null);
                      setListingFormInfo({
                        ...ListingFormInfo,
                        listingImage: ListingFormInfo.listingImage.filter(
                          (item) => {
                            return item !== photo;
                          }
                        ),
                      });
                    }}
                  />
                  <img key={index} src={photo} />
                </PreviewImageContainer>
              );
            })} */}
          </div>
        )}
      {errMsg && <p>{errMsg}</p>}
      <ImageUploadDiv>
        <input
          id="fileInput"
          type="file"
          name="listingImage"
          accept="image/png, image/jpeg"
          onChange={(e) => handleFileInputChange(e)}
          // value={fileInputState}
        />
      </ImageUploadDiv>
    </ImageInputContainer>
  );
};

const PreviewImageContainer = styled.div`
  display: flex;
  width: 90%;
  margin: 0px auto;
  /* flex-direction: column; */
  /* border: 1px solid green; */
  @media (max-width: 767px) {
    flex-direction: column;
    width: 100%;
  }
`;

const ImageUploadDiv = styled.div`
  @media (max-width: 767px) {
    flex-direction: column;
  }

  display: flex;
  justify-content: center;
`;

const ImageInputContainer = styled.div`
  @media (min-width: 767px) {
    & img {
      width: 90%;
      height: auto;
    }
  }
  @media (max-width: 767px) {
    & img {
      width: 90%;
      height: auto;
    }
  }

  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  & img {
    border-radius: 10px;
    margin: 10px auto 5px auto;
  }
`;
export default UploadImage;
