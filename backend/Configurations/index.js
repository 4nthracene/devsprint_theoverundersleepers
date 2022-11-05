const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/../.env` });

module.exports = {
    DB_URI: process.env.MONGO_URI,
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI,
    REVERSE_GEOCODER: process.env.REVERSE_GEOCODER_API
};
