const express = require('express');
const server = express();
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config({ path: '../.env' })

/*const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "nailton123",
    database: "crudgames",
});*/

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10
})

server.use(express.json());
server.use(cors());

let queryCount = 0; // Initialize the query count

// Middleware to increment the query count
server.use((req, res, next) => {
  queryCount += 1; // Increment the query count for every request
  next();
});

server.post("/register", (req, res) => {
    const { name } = req.body;
    const { category } = req.body;

    let sql = "INSERT INTO games (name, category) VALUES (?,?)"
    db.query(sql, [name, category], (err,result) =>{
        if (err) {
            console.log(err);
        }else{
            console.log(result);
        }
    })
});

server.get("/games", (req, res) => {
    let sql = "SELECT * FROM games";
    db.query(sql, (err,result) =>{
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

/*server.put("/edit", (req, res) => {
    const { id } = req.body;
    const { name } = req.body;
    const { category } = req.body;

    let sql = "UPDATE games SET name = ?, category = ? WHERE id = ?";
    db.query(sql, [name, category, id], (err,result) =>{
        if (err) {
            console.log(err);
        }else{

            res.send(result);
        }
    })
});*/

server.delete("/delete/:index", (req,res) =>{
    const { index } = req.params

    let sql = "DELETE FROM games WHERE id = ?"
    db.query(sql, [index], (err,result) =>{err ? console.log(err) : res.send(result)})
})
server.listen(3001, () =>
    console.log("Running in the port 3001")
);

server.get('/running-queries', (req, res) => {
  db.query('SHOW PROCESSLIST', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Unable to fetch running queries' });
    }
    res.json(results);
  });
});

server.get('/query-count', (req, res) => {
  res.json({ queryCount });
});
