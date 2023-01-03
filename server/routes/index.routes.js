const express = require("express");
const router = express.Router();

const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo");

console.log(getTodos);
router.get("/todo", getTodos);

router.post("/todo", addTodo);

router.put("/todo/:id", updateTodo);

router.delete("/todo/:id", deleteTodo);

module.exports = router;
