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

server.post("/add", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Retrieve user id
    const getIdQuery = "SELECT id FROM users WHERE email = ? AND password = ?";
    const userIdRows = await db.query(getIdQuery, [email, password]);
    const userId = userIdRows[0]?.id;

    if (!userId) {
      return res.status(404).send("User not found");
    }

    // Insert into todos
    const insertTodoQuery = "INSERT INTO todos (name, user) VALUES (?, ?)";
    await db.query(insertTodoQuery, [name, userId]);

    res.status(200).send("Todo added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
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

