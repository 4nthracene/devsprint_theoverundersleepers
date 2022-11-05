const { Router } = require("express");
const Authentication = require("../../Controllers/Authentication");
const router = Router();

router.get("/", Authentication.Authenticate); 
router.get("/callback", Authentication.CB); 
router.get("/test", Authentication.postSignUp);
router.get("/refresh", Authentication.refresh);

module.exports = router;
