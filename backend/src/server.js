const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const AdminRoute = require("./routes/AdminRoute");
// const db = require("./config/config");
// db.sync();

app.use(cors());
app.use(express.json());

app.use(AdminRoute);

app.get("/", function (req, res) {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
