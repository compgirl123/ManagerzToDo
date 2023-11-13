const express = require('express');
const server = express();
const mysql = require('mysql');
const cors = require('cors');
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
  try {
    const { name, category } = req.body;
    const sql = "INSERT INTO todos (name, category) VALUES (?,?)";
    const result = db.query(sql, [name, category]);
    console.log(result);
    res.status(200).send("Game added successfully");
} catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
}
});

/*server.get("/todos", (req, res) => {
    let sql = "SELECT * FROM todos";
    db.query(sql, (err,result) =>{
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    })
});*/

server.post("/todos", (req, res) => {
  const { email, password } = req.body;
  console.log("bananas");
  // If authentication is successful, proceed to fetch todos
  let gamesSql = "SELECT * FROM todos";
  //let gamesSql = "SELECT * FROM todos WHERE user = (SELECT id FROM users WHERE email = ? AND password = ?)";
  //db.query(gamesSql, [email, password],  (err, result) => {
  /*db.query(gamesSql,  (err, result) => {
    alert("THEY")
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error while fetching todos.' });
    } else {
      console.log(result);
      return res.json(result);
    }
  });*/
  // Authenticate user
  //const authSql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(authSql, [email, password], (authErr, authResults) => {
    if (authErr) {
      console.error('Authentication Error:', authErr);
      return res.status(500).json({ error: 'An error occurred during authentication.' });
    }

    if (authResults.length === 0) {
      return res.status(401).json({ error: 'Authentication Failed' });
    }

    // If authentication is successful, proceed to fetch todos
    let gamesSql = "SELECT * FROM todos";
    db.query(gamesSql, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal server error while fetching todos.' });
      } else {
        console.log(result);
        return res.json(result);
      }
    });
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

/*server.put("/edit", (req, res) => {
    const { id } = req.body;
    const { name } = req.body;
    const { category } = req.body;

    let sql = "UPDATE todos SET name = ?, category = ? WHERE id = ?";
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

    let sql = "DELETE FROM todos WHERE id = ?"
    db.query(sql, [index], (err,result) =>{err ? console.log(err) : res.send(result)})
})
server.listen(3001, () =>
    console.log("Running in the port 3001")
);

