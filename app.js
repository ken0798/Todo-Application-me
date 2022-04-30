const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();
const port = 3000;
const dbPath = path.join(__dirname, "todoApplication.db");
let db;

async function runServer() {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(port, () => {
      console.log(`server is running on port:${port}`);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

runServer();

//get todos
app.get("/todos/", async (req, res) => {
  const {
    status = "",
    category = "",
    priority = "",
    search_q = "",
  } = req.query;
  console.log(status);
  const getStatusQueryTodo = `select * from todo where status="${status}";`;
  const todoAct = await db.all(getStatusQueryTodo);
  res.status(200).send(todoAct);
});
