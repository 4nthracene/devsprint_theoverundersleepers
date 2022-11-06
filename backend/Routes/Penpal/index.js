const { Router } = require("express");
const PenPal = require("../../Controllers/PenPal");
const router =  Router();

router.post("/assign", PenPal.assign);
router.post("/post", PenPal.post);
router.post("/get", PenPal.getPalsPost);

module.exports = router;
