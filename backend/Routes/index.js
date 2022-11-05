const { Router } = require("express");
const AuthRouter = require("./Authenticate");
const ProfileRouter = require("./Profile");
const router = Router();

router.use("/auth", AuthRouter);
router.use("/profile", ProfileRouter);

module.exports = router;
