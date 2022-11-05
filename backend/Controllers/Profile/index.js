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

    User.findOneAndUpdate(
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
  const { name, lon, lat, email, gender } = req.body;
};
