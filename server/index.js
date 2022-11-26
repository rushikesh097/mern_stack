const express = require("express");

const app = express();

const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const salt = "$2b$10$GHMgOdFTb5IcM5S5IW.1du";
const userRouter = require("./routes/user");
const collectionRouter = require("./routes/collection")

app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "urbanmart",
});

app.use("/user",userRouter);

app.use("/collection",collectionRouter);

app.listen(3001, () => {
  console.log(`Connection Established on port ${3001}`);
});
