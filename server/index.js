const express = require('express');
const server = express();
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config({ path: '../.env' })

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10
})

server.use(express.json());
server.use(cors());

server.post("/add", (req, res) => {

const { id, name, email, password } = req.body;
console.log("monkey");
console.log(id);
// Step 1: Retrieve user ID

const insertTodoQuery = 'INSERT INTO todos (name, user) VALUES (?, ?)';
db.query(insertTodoQuery, [name, id], (err) => {
  if (err) {
    console.error('Error adding todo:', err);
    res.status(500).send('Internal Server Error');
    return;
  }
  console.log('Todo added successfully');
  res.status(200).send('Todo added successfully');
});

});

server.post("/todos", (req, res) => {
  const { email, password } = req.body;
  let gamesSql = "SELECT * FROM todos WHERE user = (SELECT id FROM users WHERE email = ? AND password = ?)";
  db.query(gamesSql, [email, password],  (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal server error while fetching todos.' });
      } else {
        console.log(result);
        return res.json(result);
      }
    });
});

server.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * from users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    console.log(results);
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: 'An error occurred while processing your request.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Login Failed' });
    }
    return res.json({ success: 'Login Successful', user: results[0] });
  });
});

server.post("/signup", (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("BANANAS");
    const sql = "INSERT INTO users (name, email, password) VALUES (?,?,?)";
    const result = db.query(sql, [name, email, password]);
    console.log(result);
    res.status(200).send("Game added successfully");
} catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
}
});

server.delete("/delete/:index", (req,res) =>{
    const { index } = req.params
    let sql = "DELETE FROM todos WHERE id = ?"
    db.query(sql, [index], (err,result) =>{err ? console.log(err) : res.send(result)})
})
server.listen(3001, () =>
    console.log("Running in the port 3001")
);

