const mongoose = require("mongoose");
const dotenv = require("dotenv");
const CONFIG = require("./index");

module.exports = async () => {
    try{
        const DB = await mongoose.connect(CONFIG.DB_URI);
        console.log(`[DATABASE]: Connected ${DB.connections[0].name}`)
    } catch(e) {
        console.log(e.message);
        console.log(`Error occured while connecting to the db`);
    }
}