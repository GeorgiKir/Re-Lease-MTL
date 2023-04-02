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
  const { listingId, listingAddress, price, numBDR } = req.body;

  try {
    const coords = await geocoder.geocode(listingAddress).then((res) => {
      return { lat: res[0].latitude, lng: res[0].longitude };
    });

    await client.connect();
    const db = client.db("db-name");
    const checkIfListingExists = await db
      .collection("listings")
      .findOne({ _id: listingId });
    if (
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
      });
      if (createNewListing.acknowledged) {
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

module.exports = { getUser, postListing };
