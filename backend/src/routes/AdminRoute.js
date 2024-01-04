const express = require("express");
const router = express.Router();
const { getAdmin, createAdmin } = require("../controller/adminRouter");

router.get("/admin", getAdmin);
router.post("/admin", createAdmin);

module.exports = router;
