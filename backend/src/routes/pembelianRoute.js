const express = require("express");
const router = express.Router();
const {
  getPembelian,
  createPembelian,
  editPembelian,
  deletePembelian,
  getCashPembelian,
  chartPembelian,
} = require("../controller/pembelianController");

router.get("/pembelian", getPembelian);
router.get("/pembelian/chart", chartPembelian);
router.get("/pembelian/count", getCashPembelian);
router.delete("/pembelian/:pembelianId", deletePembelian);
router.put("/pembelian", editPembelian);
router.post("/pembelian", createPembelian);

module.exports = router;
