const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/../.env` });


module.exports = {
    DB_URI: process.env.MONGO_URI
}
