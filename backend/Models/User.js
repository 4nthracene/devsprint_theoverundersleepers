const mongoose = require("mongoose");

// Username, About, Lon, Lat, Favorite Artists, Interests, socials
const userDef = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: "I'm anonymous :3"
    },
    topArtists: [],
    interests: [],
    socials: [],
    location: {
        type:  {
            type: String,
            default: "Point"
        },
        coordinates: {
            type: [Number],
            index: '2dsphere',
        }
    }
});

userDef.index({ "location": "2dsphere" });

const userModel = mongoose.model("User", userDef);
module.exports = userModel;
