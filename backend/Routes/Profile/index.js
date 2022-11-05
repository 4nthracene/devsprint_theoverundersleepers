const ProfileController = require("../../Controllers/Profile");
const { Router } = require("express");
const router = Router();

router.post("/location", ProfileController.getLocation);
router.post("/new", ProfileController.createProfile);
router.post("/setLocation", ProfileController.setLocation);
router.post("/nearby", ProfileController.getNearbyUsers);

module.exports = router;
