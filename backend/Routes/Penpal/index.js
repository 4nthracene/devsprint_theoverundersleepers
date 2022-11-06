const { Router } = require("express");
const PenPal = require("../../Controllers/PenPal");
const router =  Router();

router.post("/assign", PenPal.assign);

module.exports = router;
