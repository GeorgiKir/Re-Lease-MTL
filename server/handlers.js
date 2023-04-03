"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
const { OPENCAGE_KEY } = process.env;
const NodeGeocoder = require("node-geocoder");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const { userEmail } = req.params;
    await client.connect();
    const db = client.db("db-name");
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
    const db = client.db("db-name");
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
  try {
    await client.connect();
    const db = client.db("db-name");
    let targetListings = await db.collection("listings").find().toArray();
    res.status(200).json({ status: 200, data: targetListings });
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
    const db = client.db("db-name");
    const deleteListingResult = await db
      .collection("listings")
      .deleteOne({ _id: listingId });
    if (deleteListingResult.acknowledged) {
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
    const db = client.db("db-name");
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

module.exports = {
  getUser,
  postListing,
  getListings,
  deleteListing,
  deleteListingFromUserDB,
};
