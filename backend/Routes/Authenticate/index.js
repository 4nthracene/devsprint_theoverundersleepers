const { Router } = require("express");
const Authentication = require("../../Controllers/Authentication");
const router = Router();

router.get("/", Authentication.postSignUp);

module.exports = router;
