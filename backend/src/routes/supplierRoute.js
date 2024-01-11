const express = require("express");
const router = express.Router();
const {
  getSupplier,
  createSupplier,
} = require("../controller/supplierController");

router.get("/supplier", getSupplier);
router.post("/supplier", createSupplier);

module.exports = router;
