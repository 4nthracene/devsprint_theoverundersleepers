const ProfileController = require("../../Controllers/Profile");
const { Router } = require("express");
const router = Router();

router.get("/location", ProfileController.getLocation);
router.post("/new", ProfileController.createProfile);
router.post("/setLocation", ProfileController.setLocation);
router.get("/nearby", ProfileController.getNearbyUsers);

module.exports = router;
