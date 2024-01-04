const express = require("express");
const router = express.Router();
const { getAdmin, createAdmin } = require("../controller/adminController");

router.get("/admin", getAdmin);
router.post("/admin", createAdmin);

module.exports = router;
