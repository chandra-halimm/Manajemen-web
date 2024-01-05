const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
require("dotenv").config();

//Routing
const adminRoute = require("./routes/AdminRoute");
const authRoute = require("./routes/authRoute");

// migrate DB
// const db = require("./config/config");
// db.sync();

app.use(cors());
app.use(express.json());

try {
  app.use(adminRoute);
  app.use(authRoute);
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
