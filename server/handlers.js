"use strict";
const { MongoClient } = require("mongodb");
const { cloudinary } = require("./utils/cloudinary");

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
    if (targetUser) {
      res.status(200).json({ status: 200, data: targetUser });
    } else if (!targetUser) {
      const createNewExternalUser = await db.collection("users").insertOne({
        _id: uuidv4(),
        client_id: uuidv4(),
        email: userEmail,
        // verified: false,
      });
      if (createNewExternalUser.acknowledged) {
        let targetUser = await db
          .collection("users")
          .findOne({ email: userEmail });
        if (targetUser) {
          res.status(200).json({ status: 200, data: targetUser });
        }
      }
    }
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
    selectedTimeSlots,
    listingImage,
    borough,
    comments,
  } = req.body;
  const fullAddress = `${listingAddress}, ${postalCode}, Montreal, QC, Canada`;

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
      !numBDR ||
      !listingImage ||
      !selectedTimeSlots
    ) {
      res.status(404).json({ status: 404, data: "Something went wrong." });
    } else {
      console.log("Listing is good");
      let listingImgUrl = [];
      for (let i = 0; i < listingImage.length; i++) {
        const cloudinaryResult = await cloudinary.uploader
          .upload(listingImage[i], {
            upload_preset: "ReLease_Photos",
          })
          .then((data) => {
            listingImgUrl.push({ id: data.public_id, url: data.secure_url });
          })
          .catch((err) => {
            console.log(err);
          });
      }

      if (listingImgUrl.length == listingImage.length) {
        const createNewListing = await db.collection("listings").insertOne({
          _id: listingId,
          listingCoords: coords,
          listingAddress: listingAddress,
          postalCode: postalCode,
          borough: borough,
          price: price,
          numBDR: numBDR,
          listingDescription: listingDescription,
          listingImage: listingImgUrl,
          comments: comments,
          // listingImgPublicId: publidId,
        });

        const addNewListingToUserProfile = await db
          .collection("users")
          .updateOne(
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
                  borough: borough,
                  listingDescription: listingDescription,
                  listingImage: listingImgUrl,
                  // listingImgPublicId: publidId,
                },
              },
            }
          );

        let arr = await selectedTimeSlots.map((item) => {
          return { ...item, _id: uuidv4() };
        });

        const timeSlotsResult = await db
          .collection("timeslots")
          .insertMany(arr);

        if (
          timeSlotsResult.acknowledged &&
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
      } else {
        res.status(404).json({ status: 404, data: "Something went wrong." });
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
  const { listingPhotos, email } = req.body;

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("re-lease");

    await listingPhotos.forEach((item) => {
      cloudinary.uploader.destroy(item.id);
    });
    console.log(listingPhotos.length);

    const deleteListingResultFromUserDB = await db
      .collection("users")
      .updateOne({ email: email }, { $unset: { listingInfo: "" } });

    const deleteListingResult = await db
      .collection("listings")
      .deleteOne({ _id: listingId });

    const deleteTimeslots = await db
      .collection("timeslots")
      .deleteMany({ ownerId: listingId });
    if (
      deleteListingResult.acknowledged &&
      deleteTimeslots.acknowledged &&
      deleteListingResultFromUserDB.acknowledged
    ) {
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
    // await client.connect();
    // const db = client.db("re-lease");
    // const deleteListingResult = await db
    //   .collection("users")
    //   .updateOne({ email: userEmail }, { $unset: { listingInfo: "" } });
    // if (deleteListingResult.acknowledged) {
    //   res.status(200).json({
    //     status: 200,
    //     data: "Listing deleted",
    //   });
    // }
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
    } else {
      res.status(404).json({ status: 404, data: "Something went wrong." });
    }
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
      .aggregate([
        { $match: { [searchField]: listingId } },
        {
          $group: {
            _id: "$date",
            timeslots: { $push: "$$ROOT" },
          },
        },
      ])
      .toArray();

    if (result.length > 0 && searchField === "visitorId") {
      res.status(200).json({
        status: 200,
        data: result,
      });
    } else if (result.length > 0 && searchField === "ownerId") {
      let structuredResult = await db
        .collection("timeslots")
        .aggregate([
          { $match: { [searchField]: listingId } },
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
    } else {
      res.status(400).json({
        status: 400,
        data: "No time slots to show",
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  } finally {
    await client.close();
    console.log("disconnected!");
  }
};

const deleteTimeslot = async (req, res) => {
  const { visitId } = req.params;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("re-lease");
    // const deleteTimeslotResult = await db
    //   .collection("users")
    //   .updateOne({ email: userEmail }, { $unset: { listingInfo: "" } });
    const deleteTimeSlot = await db.collection("timeslots").updateOne(
      {
        _id: visitId,
      },
      { $set: { isAvailable: true, visitorId: "" } }
    );

    if (deleteTimeSlot.acknowledged) {
      res.status(200).json({
        status: 200,
        message: "succesfully deleted",
        data: deleteTimeSlot,
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  } finally {
    await client.close();
    console.log("disconnected!");
  }
};

const postComment = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { listingId, comment, reply, commentId, username } = req.body;
  try {
    await client.connect();
    const db = client.db("re-lease");

    if (reply) {
      const newReply = await db
        .collection("listings")
        .updateOne(
          { _id: listingId, "comments.id": commentId },
          { $set: { "comments.$.reply": reply } }
        );
      if (newReply.acknowledged) {
        res.status(200).json({
          status: 200,
          message: "Replied successfully!",
          data: reply,
        });
      } else {
        res.status(400).json({
          status: 400,
          data: "Unable to leave reply",
        });
      }
    } else if (comment) {
      const commentToBePosted = {
        id: uuidv4(),
        username: username,
        comment: comment,
        reply: null,
      };
      const newComment = await db
        .collection("listings")
        .updateOne(
          { _id: listingId },
          { $push: { comments: commentToBePosted } }
        );
      if (newComment.acknowledged) {
        res.status(200).json({
          status: 200,
          message: "commented successfully!",
          data: comment,
        });
      } else {
        res.status(400).json({
          status: 400,
          data: "Unable to leave comment",
        });
      }
    }
  } catch (err) {
    console.log("Error: ", err);
  } finally {
    await client.close();
    console.log("disconnected!");
  }
};

const getListing = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const { listingId } = req.params;
    await client.connect();
    const db = client.db("re-lease");
    let targetListing = await db
      .collection("listings")
      .findOne({ _id: listingId });
    if (targetListing) {
      res.status(200).json({ status: 200, data: targetListing });
    } else {
      res.status(400).json({
        status: 400,
        data: "Cannot find your listing",
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  } finally {
    await client.close();
    console.log("disconnected!");
  }
};

const updateListing = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  var geocoder = NodeGeocoder({
    provider: "opencage",
    apiKey: OPENCAGE_KEY,
  });
  const { listingId } = req.params;
  const {
    email,
    postalCode,
    listingAddress,
    borough,
    price,
    numBDR,
    listingDescription,
    listingImage,
    comments,
  } = req.body;

  const fullAddress = `${listingAddress}, ${postalCode}, Montreal QC, Canada`;

  try {
    await client.connect();
    const db = client.db("re-lease");
    const coords = await geocoder.geocode(fullAddress).then((res) => {
      if (res.length < 1) {
        return null;
      } else {
        return { lat: res[0].latitude, lng: res[0].longitude };
      }
    });
    console.log("coords: ", coords);

    if (
      coords === undefined ||
      coords === null ||
      (coords.lat === 45.50884 && coords.lng === -73.58781)
    ) {
      return res.status(400).json({
        status: 400,
        message: "Invalid address",
        data: "Invalid address.",
      });
    } else {
      const updateTargetListing = await db.collection("listings").updateOne(
        { _id: listingId },
        {
          $set: {
            listingCoords: coords,
            listingAddress: listingAddress,
            postalCode: postalCode,
            borough: borough,
            price: price,
            numBDR: numBDR,
            listingDescription: listingDescription,
          },
        }
      );

      const updateListingInUserProfile = await db.collection("users").updateOne(
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
              borough: borough,
              listingDescription: listingDescription,
              listingImage: listingImage,
              comments: comments,
            },
          },
        }
      );
      if (
        updateTargetListing.acknowledged &&
        updateListingInUserProfile.acknowledged
      ) {
        return res.status(200).json({
          status: 200,
          message: "Successfully updated!",
          data: {
            _id: listingId,
            listingCoords: coords,
            listingAddress: listingAddress,
            postalCode: postalCode,
            price: price,
            numBDR: numBDR,
            borough: borough,
            listingDescription: listingDescription,
            listingImage: listingImage,
            comments: comments,
          },
        });
      } else {
        return res
          .status(400)
          .json({ status: 400, data: "Something went wrong" });
      }
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
  deleteTimeslot,
  postComment,
  getListing,
  updateListing,
};
