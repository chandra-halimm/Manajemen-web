const express = require("express");
const router = express.Router();
const {
  createBarang,
  getCountBarang,
  getBarang,
} = require("../controller/barangController");

router.get("/barang", getBarang);
router.get("/barang/count", getCountBarang);
router.post("/barang", createBarang);

module.exports = router;
