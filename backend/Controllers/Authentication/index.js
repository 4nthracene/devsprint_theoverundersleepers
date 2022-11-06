const CONFIGURATIONS = require("../../Configurations");
const axios = require("axios");
const User = require("../../Models/User");
const queryString = require("querystring");
const { v4: uuid } = require("uuid");

const TOKEN = "https://accounts.spotify.com/api/token";

const Authenticate = (req, res, next) => {
  console.log("something ", CONFIGURATIONS.SPOTIFY_REDIRECT_URI);
  const id = uuid();
  const scope = "user-top-read user-read-email";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      queryString.stringify({
        response_type: "code",
        client_id: CONFIGURATIONS.SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: CONFIGURATIONS.SPOTIFY_REDIRECT_URI,
        state: id,
      })
  );
};

async function CB(req, res, next) {
  console.log(req.query);
  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    res.redirect(
      "/#" +
        queryString.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    var authOptions = {
      url: TOKEN,
      data: queryString.stringify({
        code: code,
        redirect_uri: CONFIGURATIONS.SPOTIFY_REDIRECT_URI,
        grant_type: "authorization_code",
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer(
            CONFIGURATIONS.SPOTIFY_CLIENT_ID +
              ":" +
              CONFIGURATIONS.SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
      },
      method: "post",
    };
    try {
      const data = await axios(authOptions);
      const { data: UserData } = await axios.get(
        "https://api.spotify.com/v1/me",
        {
          headers: {
            Authorization: `Bearer ${data.data.access_token}`,
          },
        }
      );
      const { data: ArtistsData } = await axios.get(
        "https://api.spotify.com/v1/me/top/artists",
        {
          headers: {
            Authorization: `Bearer ${data.data.access_token}`,
          },
        }
      );
      const artistsIds = ArtistsData.items.map((x) => ({ id: x.id, images: x.images }));
      if (!(await User.findOne({ email: UserData.email }))) {
        const newUser = new User({
          email: UserData.email,
          username: UserData.display_name,
          topArtists: artistsIds,
        });
        const savedUser = await newUser.save();
        console.log(savedUser);
      }

      return res.redirect(`http://localhost:3002/cb?accessToken=${data.data.access_token}`);
    } catch (error) {
      console.log(error);
    }
  }
}

const refresh = async (req, res, next) => {
  const { refresh_token } = req.query;
  try {
    const authOptions = {
      url: `https://accounts.spotify.com/api/token`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer.from(
            CONFIGURATIONS.SPOTIFY_CLIENT_ID +
              ":" +
              CONFIGURATIONS.SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
      },
      data: querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: refresh_token,
        client_id: CONFIGURATIONS.SPOTIFY_CLIENT_ID,
      }),
      method: "POST",
    };
    const data = await axios(authOptions);
    return res.json({ new_access_token: data.data.access_token });
  } catch (err) {
    console.log(err);
  }
};

const postSignUp = (req, res, next) => {
  return res.json({
    message: "Authentication Controller",
  });
};

module.exports = {
  postSignUp,
  Authenticate,
  CB,
  refresh,
};
