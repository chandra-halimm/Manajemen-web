const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
require("dotenv").config();

//Routing
const adminRoute = require("./routes/AdminRoute");
const authRoute = require("./routes/authRoute");
const karyawanRoute = require("./routes/karyawanRoute");
const positionRoute = require("./routes/positionRoute");
const supplierRoute = require("./routes/supplierRoute");
const barangRoute = require("./routes/barangRoute");
// const pembelianRoute = require("./routes/pembelianRoute");

// migrate DB
// const db = require("./config/config");
// db.sync();

app.use(cors());
app.use(express.json());

try {
  app.use(adminRoute);
  app.use(authRoute);
  app.use(karyawanRoute);
  app.use(positionRoute);
  app.use(supplierRoute);
  app.use(barangRoute);
  // app.use(pembelianRoute);
} catch (error) {
  console.error(error);
}

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
