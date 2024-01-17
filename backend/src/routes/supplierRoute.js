const express = require("express");
const router = express.Router();
const {
  getSupplier,
  createSupplier,
  getCountSupplier,
} = require("../controller/supplierController");

router.get("/supplier", getSupplier);
router.get("/supplier/count", getCountSupplier);
router.post("/supplier", createSupplier);

module.exports = router;
