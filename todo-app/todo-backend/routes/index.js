const express = require("express");
const router = express.Router();

const configs = require("../util/config");

const { getTodoCount } = require("../redis/todoCounter");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

/* GET redis statics data. */
router.get("/statics", async (req, res) => {
  console.log("here");
  const count = await getTodoCount();

  res.send({
    added_todos: count,
  });
});

module.exports = router;
