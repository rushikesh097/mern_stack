const express = require("express");

const app = express();

const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const salt = "$2b$10$GHMgOdFTb5IcM5S5IW.1du";

app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "urbanmart",
});

app.post("/adduser", (req, res) => {
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

app.post("/validateuser", (req, res) => {
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

app.get("/getuser/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM users WHERE id=?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(result);
    }
  });
});

app.get("/buyedproducts/:id", (req, res) => {
  const userId = req.params.id;
  db.query(
    "SELECT * FROM buyedproducts WHERE userid = ? ORDER BY id DESC",
    [userId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/addbuyedproduct", (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const userId = req.body.userId;
  db.query(
    "INSERT INTO buyedproducts (name,description,price,userid) VALUES (?,?,?,?)",
    [name, description, price, userId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/addproduct", (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  db.query(
    "INSERT INTO products (name,description,price) VALUES (?,?,?)",
    [name, description, price],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/updatebalance", (req, res) => {
  const id = req.body.id;
  const balance = req.body.balance;
  db.query(
    "UPDATE users SET balance=? WHERE id=?",
    [balance, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/deleteproduct/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM products WHERE id=?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/deletebuyedproduct/:id", (req, res) => {
  const id = req.params.id;
  if (id !== undefined) {
    db.query("DELETE FROM buyedproducts WHERE id=?", [id], (err, result) => {
      if (err) {
        console.log(err + " 200 ");
      } else {
        res.send(result);
      }
    });
  }
});

app.listen(3001, () => {
  console.log(`Connection Established on port ${3001}`);
});
