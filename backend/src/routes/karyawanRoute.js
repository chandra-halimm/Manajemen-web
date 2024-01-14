const express = require("express");
const router = express.Router();
const {
  getKaryawan,
  createKaryawan,
  editKaryawan,
  deleteKaryawan,
} = require("../controller/karyawanController");

router.get("/karyawan", getKaryawan);
router.delete("/karyawan/:karyawanId", deleteKaryawan);
router.put("/karyawan", editKaryawan);
router.post("/karyawan", createKaryawan);

module.exports = router;
