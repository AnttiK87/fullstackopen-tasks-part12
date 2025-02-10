const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const { isValidObjectId } = require("mongoose");
const { saveTodoCount } = require("../redis/todoCounter");

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  await saveTodoCount();
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  try {
    await req.todo.delete();
    res.sendStatus(200);
  } catch {
    res.sendStatus(404);
  }
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  try {
    console.log(req.todo);
    res.send(req.todo);
  } catch {
    res.sendStatus(404);
  }
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const { _id, ...updatedTodo } = req.body;

  //console.log(`id is ${req.todo._id} new content is ${updatedTodo}`);
  const changedTodo = await Todo.findByIdAndUpdate(req.todo._id, updatedTodo, {
    new: true,
  });

  res.send(changedTodo);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
