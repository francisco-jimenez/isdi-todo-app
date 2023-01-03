import axios from "axios";

const baseUrl = "http://localhost:5005/api";

export const getTodos = async () => {
  try {
    const todos = await axios.get(baseUrl + "/todo");
    return todos;
  } catch (error) {
    throw new Error(error);
  }
};

export const addTodo = async (formData) => {
  try {
    const todo = {
      name: formData.name,
      description: formData.description,
      status: false,
    };
    const saveTodo = await axios.post(baseUrl + "/todo", todo);
    return saveTodo;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateTodo = async (todo) => {
  try {
    const todoUpdate = {
      status: true,
    };
    const updatedTodo = await axios.put(
      `${baseUrl}/todo/${todo._id}`,
      todoUpdate
    );
    return updatedTodo;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTodo = async (_id) => {
  try {
    const deletedTodo = await axios.delete(`${baseUrl}/todo/${_id}`);
    return deletedTodo;
  } catch (error) {
    throw new Error(error);
  }
};
