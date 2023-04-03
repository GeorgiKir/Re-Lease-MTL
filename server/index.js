const path = require("path");
const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const {
  getUser,
  postListing,
  getListings,
  deleteListing,
  deleteListingFromUserDB,
} = require("./handlers");

const PORT = 8000;

var app = express();

app.use(express.json());

app.get("/hello", (req, res) => {
  res.status(200).json({ hi: "hi" });
});
app.get("/users/:userEmail", getUser);
app.post("/listings/addListing", postListing);
app.get("/listings/listingResults", getListings);
app.delete("/listings/deletelisting/:listingId", deleteListing);
app.patch("/listings/deletelisting/:userEmail", deleteListingFromUserDB);
// endpoint for getting all listings based on criteria
// endpoint for getting a single listing

app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});

const server = app.listen(PORT, function () {
  console.info("🌍 Listening on port " + server.address().port);
});
