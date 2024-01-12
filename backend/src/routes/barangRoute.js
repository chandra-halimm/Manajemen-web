const express = require("express");
const router = express.Router();
const { createBarang, getBarang } = require("../controller/barangController");

router.get("/barang", getBarang);
router.post("/barang", createBarang);

module.exports = router;
