const express = require("express");
const mysql = require("mysql");

const router = express.Router();

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "urbanmart",
});

router.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(result);
    }
  });
});

router.get("/buyedproducts/:id", (req, res) => {
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

router.post("/addbuyedproduct", (req, res) => {
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

router.post("/addproduct", (req, res) => {
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

router.put("/updatebalance", (req, res) => {
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

router.delete("/deleteproduct/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM products WHERE id=?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.delete("/deletebuyedproduct/:id", (req, res) => {
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

module.exports = router;