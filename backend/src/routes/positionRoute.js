const express = require("express");
const router = express.Router();
const {
  getPosition,
  createPosition,
} = require("../controller/positionController");

router.get("/position", getPosition);
router.post("/position", createPosition);

module.exports = router;
