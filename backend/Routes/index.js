const { Router } = require("express");
const PenPalRouter = require("./Penpal");
const AuthRouter = require("./Authenticate");
const ProfileRouter = require("./Profile");
const router = Router();

router.use("/auth", AuthRouter);
router.use("/profile", ProfileRouter);
router.use("/penpal", PenPalRouter);

module.exports = router;
