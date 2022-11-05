const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const CONFIGURATION = require("./Configurations");
const PreRun = require("./Configurations/preRun.js");
const dotenv = require("dotenv");
const Routes = require("./Routes");
const Configurations = require("./Configurations");
dotenv.config({ path: `${__dirname}/.env` })

const Run = async () => {
    await PreRun();
    const port = process.env.PORT || 3000;
    const app = express();
    app.use(express.json());
    app.use(Routes)
    app.listen(port, () => {
        console.log(`[Server]: Running on port ${port}`);
    });
}

Run();
