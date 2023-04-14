import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

const UploadImage = ({ ListingFormInfo, setListingFormInfo }) => {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState(null);
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 287560) {
      console.log("File too large");
      setErrMsg("Your file is too large");

      return;
    } else {
      console.log("File size is acceptable");
      setErrMsg(null);
      setSelectedFile(file);
      setFileInputState(e.target.value);
    }
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // console.log(reader.result);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      //   uploadImage(reader.result);
      setListingFormInfo({ ...ListingFormInfo, listingImage: reader.result });
      //   console.log(reader.result);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
    };
  };

  return (
    <ImageInputContainer>
      {!errMsg && (
        <img
          src={previewSource ? previewSource : "none"}
          alt="chosenPhoto"
          style={{ width: "80%", height: "scale", border: "1px solid black" }}
        />
      )}
      {errMsg && <p>Your file is too large</p>}
      <div style={{ display: "flex" }}>
        <input
          id="fileInput"
          type="file"
          name="listingImage"
          accept="image/png, image/jpeg"
          onChange={handleFileInputChange}
          // value={fileInputState}
        />
        {selectedFile && (
          <button
            style={{ width: "25%" }}
            type="button"
            onClick={(e) => {
              handleSubmitFile(e);
            }}
          >
            Submit Image
          </button>
        )}
      </div>
    </ImageInputContainer>
  );
};

const ImageInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;
export default UploadImage;
