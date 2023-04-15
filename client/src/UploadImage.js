import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import emptyPhoto from "./assets/emptyPhoto.jpg";
import { GrClose } from "react-icons/gr";

const UploadImage = ({ ListingFormInfo, setListingFormInfo }) => {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState(null);

  const handleFileInputChange = (e) => {
    if (ListingFormInfo.listingImage.length >= 3) {
      setErrMsg("Max number of pictures reached");
    } else {
      const file = e.target.files[0];
      if (file.size > 500000) {
        console.log("File too large");
        setErrMsg("Your file is too large");

        return;
      } else {
        console.log("File size is acceptable");
        setErrMsg(null);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        // setSelectedFile(file);
        // selectedPhotos.push(file);
        setFileInputState(e.target.value);
        reader.onloadend = () => {
          // setPreviewSource(reader.result);
          if (ListingFormInfo.listingImage !== []) {
            setListingFormInfo({
              ...ListingFormInfo,
              listingImage: [...ListingFormInfo.listingImage, reader.result],
            });
          } else {
            setListingFormInfo({
              ...ListingFormInfo,
              listingImage: [reader.result],
            });
          }
        };
      }
    }
    // previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();

    selectedPhotos.map((photo) => {
      reader.readAsDataURL(photo);
      reader.onloadend = () => {
        setPreviewSource(reader.result);
      };
    });

    // reader.readAsDataURL(file);
    // // console.log(reader.result);
    // reader.onloadend = () => {
    //   setPreviewSource(reader.result);
    // };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedPhotos) return;
    // const reader = new FileReader();
    // reader.readAsDataURL(selectedFile);
    //   uploadImage(reader.result);
    setListingFormInfo({ ...ListingFormInfo, listingImage: selectedPhotos });
    //   console.log(reader.result);
  };

  return (
    <ImageInputContainer>
      {ListingFormInfo.listingImage &&
        ListingFormInfo.listingImage.length > 0 && (
          <div style={{ height: "fit-content" }}>
            {ListingFormInfo.listingImage.map((photo, index) => {
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

                      // setSelectedPhotos((prevState) =>
                      //   prevState.filter((item) => {
                      //     return item !== photo;
                      //   })
                      // );
                    }}
                  />
                  <img key={index} src={photo} />
                </PreviewImageContainer>
              );
            })}
          </div>
        )}
      {/* {!errMsg && <img src={previewSource ? previewSource : emptyPhoto} />} */}
      {errMsg && <p>{errMsg}</p>}
      <ImageUploadDiv>
        <input
          id="fileInput"
          type="file"
          name="listingImage"
          accept="image/png, image/jpeg"
          onChange={handleFileInputChange}
          // value={fileInputState}
        />

        {/* {selectedPhotos && selectedPhotos.length && (
          <button
            style={{ width: "fit-content" }}
            type="button"
            onClick={(e) => {
              setErrMsg(null);
              handleSubmitFile(e);
            }}
          >
            Submit Images
          </button>
        )} */}
      </ImageUploadDiv>
    </ImageInputContainer>
  );
};

const PreviewImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid green;
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
      width: 100%;
      height: auto;
    }
  }
  @media (max-width: 767px) {
    & img {
      width: 100%;
      height: auto;
    }
  }
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;
export default UploadImage;
