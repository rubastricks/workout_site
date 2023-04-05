const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongo = require("mongoose");
const { default: mongoose } = require("mongoose");
const { db } = require("./config/config");
const api = require("./routes");
const { isAuthenticated } = require("./middleware");

const app = express();

//TODO: adding whitelist
app.use(cors());
require("./services/passport");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

mongoose
  .connect(db.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Succefuly connected to db");
  })
  .catch((err) => {
    console.log("err :>>", err);
  });

app.get("/", (req, res) => {
  res.json({
    message: "something",
  });
});

app.use("/api/v1", api);
app.use(isAuthenticated);
module.exports = app;
