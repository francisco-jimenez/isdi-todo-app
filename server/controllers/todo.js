const Todo = require("../models/todo");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ todos });
  } catch (error) {
    throw error;
  }
};

const addTodo = async (req, res) => {
  try {
    const body = req.body;

    console.log(req.body);
    const todo = new Todo({
      name: body.name,
      description: body.description,
      status: body.status,
    });

    const newTodo = await todo.save();
    const allTodos = await Todo.find();

    res
      .status(201)
      .json({ message: "Todo added", todo: newTodo, todos: allTodos });
  } catch (error) {
    throw error;
  }
};

const updateTodo = async (req, res) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updateTodo = await Todo.findByIdAndUpdate({ _id: id }, body);
    const allTodos = await Todo.find();
    res.status(200).json({
      message: "Todo updated",
      todo: updateTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
};

const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndRemove(req.params.id);
    const allTodos = await Todo.find();
    res.status(200).json({
      message: "Todo deleted",
      todo: deletedTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { getTodos, addTodo, updateTodo, deleteTodo };
