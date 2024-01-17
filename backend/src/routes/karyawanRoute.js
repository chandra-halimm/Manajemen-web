const express = require("express");
const router = express.Router();
const {
  getKaryawan,
  createKaryawan,
  editKaryawan,
  getCountKaryawan,
  deleteKaryawan,
} = require("../controller/karyawanController");

router.get("/karyawan", getKaryawan);
router.get("/karyawan/count", getCountKaryawan);
router.delete("/karyawan/:karyawanId", deleteKaryawan);
router.put("/karyawan", editKaryawan);
router.post("/karyawan", createKaryawan);

module.exports = router;
