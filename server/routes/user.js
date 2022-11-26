const express = require("express")
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const router = express.Router()

const salt = "$2b$10$GHMgOdFTb5IcM5S5IW.1du";

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "urbanmart",
});

router.post("/adduser", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const hash = bcrypt.hashSync(req.body.password, salt);
  const balance = 10000;
  db.query(
    "INSERT INTO users (name,email,password,balance) VALUES (?,?,?,?)",
    [name, email, hash, balance],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.post("/validateuser", (req, res) => {
  const email = req.body.email;
  const hash = bcrypt.hashSync(req.body.password, salt);
  db.query(
    "SELECT id,COUNT(*) as count FROM users WHERE email=? AND password=?",
    [email, hash],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/getuser/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM users WHERE id=?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


module.exports = router;