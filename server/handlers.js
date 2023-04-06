"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
const { OPENCAGE_KEY } = process.env;
const NodeGeocoder = require("node-geocoder");
const { v4: uuidv4 } = require("uuid");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const { userEmail } = req.params;
    await client.connect();
    const db = client.db("re-lease");
    let targetUser = await db.collection("users").findOne({ email: userEmail });
    res.status(200).json({ status: 200, data: targetUser });
  } catch (err) {
    console.log("Error: ", err);
  } finally {
    await client.close();
    console.log("disconnected!");
  }
};

const postListing = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  var geocoder = NodeGeocoder({
    provider: "opencage",
    apiKey: OPENCAGE_KEY,
  });
  const {
    listingId,
    email,
    listingAddress,
    price,
    numBDR,
    postalCode,
    listingDescription,
    visitSchedule,
    borough,
  } = req.body;
  const fullAddress = `${listingAddress} ${postalCode} Montreal`;

  try {
    const coords = await geocoder.geocode(fullAddress).then((res) => {
      if (res.length < 1) {
        return null;
      } else {
        return { lat: res[0].latitude, lng: res[0].longitude };
      }
      console.log("res: ", res);
    });
    console.log("coords: ", coords);

    if (
      coords === undefined ||
      coords === null ||
      (coords.lat === 45.50884 && coords.lng === -73.58781)
    ) {
      return res.status(404).json({ status: 404, data: "Invalid address." });
    }

    await client.connect();
    const db = client.db("re-lease");
    const checkIfListingExists = await db
      .collection("listings")
      .findOne({ _id: listingId });
    if (
      !postalCode ||
      !listingId ||
      !coords ||
      !listingAddress ||
      checkIfListingExists ||
      !price ||
      !numBDR
    ) {
      res.status(404).json({ status: 404, data: "Something went wrong." });
    } else {
      const createNewListing = await db.collection("listings").insertOne({
        _id: listingId,
        listingCoords: coords,
        listingAddress: listingAddress,
        postalCode: postalCode,
        borough: borough,
        price: price,
        numBDR: numBDR,
        listingDescription: listingDescription,
      });

      const addNewListingToUserProfile = await db.collection("users").updateOne(
        { email: email },
        {
          $set: {
            listingInfo: {
              _id: listingId,
              listingCoords: coords,
              listingAddress: listingAddress,
              postalCode: postalCode,
              price: price,
              numBDR: numBDR,
              listingDescription: listingDescription,
            },
          },
        }
      );

      console.log("object id: ", `ObjectId('${listingId}')`);
      console.log("add new listing: ", addNewListingToUserProfile);
      if (
        createNewListing.acknowledged &&
        addNewListingToUserProfile.acknowledged
      ) {
        res.status(200).json({
          status: 200,
          data: createNewListing,
          message: "Your listing has been created successfully",
        });
      } else {
        res
          .status(404)
          .json({ status: 404, data: "Unable to create your listing" });
      }
    }
  } catch (err) {
    console.log("Error: ", err);
  } finally {
    await client.close();
    console.log("disconnected!");
  }
};

const getListings = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { borough, price, bedrooms } = req.params;
  const matchingListings = [];
  try {
    await client.connect();
    const db = client.db("re-lease");
    let targetListings = await db.collection("listings").find().toArray();
    if (targetListings) {
      targetListings.map((listing) => {
        if (
          listing.borough === borough &&
          parseInt(listing.price) <= parseInt(price) &&
          parseInt(listing.numBDR) >= parseInt(bedrooms)
        ) {
          matchingListings.push(listing);
        }
      });
    }
    res.status(200).json({ status: 200, data: matchingListings });
  } catch (err) {
    console.log("Error: ", err);
  } finally {
    await client.close();
    console.log("disconnected!");
  }
};

const deleteListing = async (req, res) => {
  const { listingId } = req.params;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("re-lease");
    const deleteListingResult = await db
      .collection("listings")
      .deleteOne({ _id: listingId });
    const deleteTimeslots = await db
      .collection("timeslots")
      .deleteMany({ ownerId: listingId });
    if (deleteListingResult.acknowledged && deleteTimeslots.acknowledged) {
      res.status(200).json({
        status: 200,
        message: "Listing deleted",
        data: deleteListingResult,
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  } finally {
    await client.close();
    console.log("disconnected!");
  }
};

const deleteListingFromUserDB = async (req, res) => {
  const { userEmail } = req.params;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("re-lease");
    const deleteListingResult = await db
      .collection("users")
      .updateOne({ email: userEmail }, { $unset: { listingInfo: "" } });
    if (deleteListingResult.acknowledged) {
      res.status(200).json({
        status: 200,
        data: "Listing deleted",
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  } finally {
    await client.close();
    console.log("disconnected!");
  }
};

const scheduleReservation = async (req, res) => {
  const { visitorId, visitId, listingId } = req.body;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("re-lease");
    const reserveATimeslot = await db
      .collection("timeslots")
      .updateOne(
        { _id: visitId },
        { $set: { visitorId: visitorId, isAvailable: false } }
      );
    if (reserveATimeslot.acknowledged) {
      res.status(200).json({
        status: 200,
        message: "Successfully booked visit",
        data: reserveATimeslot,
      });
    }
    // let scheduleAVisitResult = await db
    //   .collection("listings")
    //   .findOne({ _id: listingId });
    // scheduleAVisitResult = scheduleAVisitResult.visitSchedule;

    // scheduleAVisitResult.map((item) => {
    //   if (item[0] === selectedDate) {
    //     item[1].map((element, index) => {
    //       if (element === selectedTime) {
    //         item[1].splice(index, 1);
    //       }
    //     });
    //   }
    // });

    // const removingTimefromListing = await db
    //   .collection("listings")
    //   .updateOne(
    //     { _id: listingId },
    //     { $set: { visitSchedule: scheduleAVisitResult } }
    //   );

    // // console.log(scheduleAVisitResult);
    // if (removingTimefromListing.acknowledged) {
    //   res.status(200).json({
    //     status: 200,
    //     message: "Listing deleted",
    //     data: "Visit Time Deleted",
    //   });
    // }
  } catch (err) {
    console.log("Error: ", err);
  } finally {
    await client.close();
    console.log("disconnected!");
  }
};

const postTimeSlots = async (req, res) => {
  const { selectedTimeSlots } = req.body;
  const client = new MongoClient(MONGO_URI, options);
  console.log(selectedTimeSlots);
  let arr = selectedTimeSlots.map((item) => {
    return { ...item, _id: uuidv4() };
  });
  try {
    await client.connect();
    const db = client.db("re-lease");

    const result = await db.collection("timeslots").insertMany(arr);
    if (result.acknowledged) {
      res.status(200).json({
        status: 200,
        data: "Success",
      });
    } else {
      res.status(400).json({
        status: 400,
        data: "Something went wrong.",
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  } finally {
    await client.close();
    console.log("disconnected!");
  }
};

const getTimeSlots = async (req, res) => {
  const { listingId, searchField } = req.params;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("re-lease");
    let result = await db
      .collection("timeslots")
      .aggregate([{ $match: { [searchField]: listingId } }])
      .toArray();

    let structuredResult = await db
      .collection("timeslots")
      .aggregate([
        {
          $group: {
            _id: "$date",
            timeslots: { $push: "$$ROOT" },
          },
        },
      ])
      .toArray();

    console.log(structuredResult);

    if (structuredResult) {
      res.status(200).json({
        status: 200,
        data: structuredResult,
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  } finally {
    await client.close();
    console.log("disconnected!");
  }
};

module.exports = {
  getUser,
  postListing,
  getListings,
  deleteListing,
  deleteListingFromUserDB,
  scheduleReservation,
  postTimeSlots,
  getTimeSlots,
};
