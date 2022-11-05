const { Router } = require("express");
const AuthRouter = require("./Authenticate");
const router = Router();

router.use("/auth", AuthRouter);

module.exports = router;
