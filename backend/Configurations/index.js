const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/../.env` });


module.exports = {
    DB_URI: process.env.MONGO_URI,
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
};
