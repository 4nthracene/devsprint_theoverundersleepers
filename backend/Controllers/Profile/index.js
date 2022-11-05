const axios = require("axios");
const User = require("../../Models/User");
const CONFIGURATIONS = require("../../Configurations");
const Configurations = require("../../Configurations");

const getLocation = async (req, res, next) => {
  const { lat, lon } = req.body;
  try {
    const api =
      Configurations.REVERSE_GEOCODER + `&latitude=${lat}&longitude=${lon}`;
    const data = await axios.get(api);

    return res.json({
      location: data.data.locality + ", " + data.data.principalSubdivision,
    });
  } catch (e) {
    console.error(e.message);
    return res.json({
      message: `An error occured while fetching location`,
    });
  }
};

const setLocation = async (req, res, next) => {
  const { lat, lon, userToken } = req.body;
  try {
    const { data: UserData } = await axios.get(
      "https://api.spotify.com/v1/me",
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    console.log(UserData.email, lat, lon);
    await User.findOneAndUpdate(
      { email: UserData.email },
      { location: { type: "Point", coordinates: [lon, lat] } }
    );
    return res.json({
      message: "Update went successfully.",
    });
  } catch (e) {
    return res.json({
      message: `Something went wrong.`,
    });
  }
};

const createProfile = async (req, res, next) => {
  const { name, lon, lat, email, bio } = req.body;
  const newUser = new User({
    name,
    email,
    bio,
    location: {
      coordinates: [lon, lat],
    },
  });
  try {
    const savedUser = await newUser.save();
    return res.json({ message: `User Creation Successfull`, user: savedUser });
  } catch(e) {
    return res.json({
      message: `An error occured while creating user`
    });
  };
};

const getNearbyUsers = async (req, res, next) => {
  const { maxDist, lon, lat } = req.body;
  try {
    const nearbyUsers = await User.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lon, lat]
          },
          $maxDistance: 1000 * 1000
        }
      }
    });

    return res.json({
      nearbyUsers
    });
  } catch(e) {
    console.log(e);
    return res.json({
      message: `An error occured`,
      error: e.message
    });
  };
};

module.exports = { getLocation, setLocation, createProfile, getNearbyUsers };
