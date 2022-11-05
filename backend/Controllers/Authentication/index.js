const Configurations = require("../../Configurations");
const axios = require("axios");
const User = require("../../Models/User");
const queryString = require("querystring");
const { v4: uuid } = require("uuid");


const TOKEN = "https://accounts.spotify.com/api/token"


const Authenticate = (req, res, next) => {
    const id = uuid();
    res.redirect(
        "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
            response_type: "code",
            client_id: CONFIGURATIONS.SPOTIFY_CLIENT_ID,
            scope: scope,
            redirect_uri: CONFIGURATIONS.SPOTIFY_REDIRECT_URI,
            state: id,
        })
    );
};

async function CB(req, res, next) {
  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    var authOptions = {
      url: TOKEN,
      data: querystring.stringify({
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
      const artistsIds = ArtistsData.items.map((x) => x.id);
      if (!(await User.findOne({ email: UserData.email }))) {
        const newUser = new User({
          email: UserData.email,
          name: UserData.display_name,
          topArtists: artistsIds,
        });
        const savedUser = await newUser.save();
        console.log(savedUser);
      }

      return res.json({ data: data.data, artists: ArtistsData });
    } catch (error) {
      console.log(error);
    }
  }
}

const postSignUp = (req, res, next) => {
    return res.json({
        message: "Authentication Controller"
    });
};

module.exports = {
    postSignUp
}