const express = require("express");
const router = express.Router();
const { getAdmin } = require("../controller/adminRouter");

router.get("/admin", getAdmin);

module.exports = router;
