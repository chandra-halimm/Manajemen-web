const express = require("express");
const router = express.Router();
const {
  getPembelian,
  createPembelian,
  editPembelian,
  deletePembelian,
} = require("../controller/pembelianController");

router.get("/pembelian", getPembelian);
router.delete("/pembelian/:pembelianId", deletePembelian);
router.put("/pembelian", editPembelian);
router.post("/pembelian", createPembelian);

module.exports = router;
