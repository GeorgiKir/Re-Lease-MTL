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
  scheduleReservation,
  postTimeSlots,
  getTimeSlots,
  deleteTimeslot,
} = require("./handlers");

const PORT = 8000;

var app = express();
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json());

app.get("/hello", (req, res) => {
  res.status(200).json({ hi: "hi" });
});
app.get("/users/:userEmail", getUser);
app.post("/listings/addListing", postListing);
app.get("/listings/listingResults/:borough/:price/:bedrooms", getListings);
app.delete("/listings/deletelisting/:listingId", deleteListing);
app.patch("/listings/deletelisting/:userEmail", deleteListingFromUserDB);
app.patch("/listings/reserveAVisitTime", scheduleReservation);
app.post("/timeSlots/addTimeSlots", postTimeSlots);
app.get("/timeSlots/:searchField/:listingId", getTimeSlots);
app.patch("/timeSlots/deleteTimeSlot/:visitId", deleteTimeslot);
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
