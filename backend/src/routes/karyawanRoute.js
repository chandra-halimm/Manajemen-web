const express = require("express");
const router = express.Router();
const {
  getKaryawan,
  createKaryawan,
} = require("../controller/karyawanController");

router.get("/karyawan", getKaryawan);
router.post("/karyawan", createKaryawan);

module.exports = router;
