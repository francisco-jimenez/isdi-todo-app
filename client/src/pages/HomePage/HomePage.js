import React, { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../../API";

const HomePage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    getTodos()
      .then(({ data: { todos } }) => setTodos(todos))
      .catch((err) => console.log(err));
  };

  const handleSaveTodo = (e, formData) => {
    e.preventDefault();
    addTodo(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error! Todo not saved");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateTodo = (todo) => {
    updateTodo(todo)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not updated");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteTodo = (_id) => {
    deleteTodo(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not deleted");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  const uncompletedTasks = todos.filter((todo) => todo.status === false);
  const completedTasks = todos.filter((todo) => todo.status === true);

  return (
    <div className="App">
      <h1 data-testid="main-header">Mis todos</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      {Boolean(uncompletedTasks.length) && <h2>Tareas por hacer</h2>}
      {uncompletedTasks.map((todo) => (
        <TodoItem
          key={todo._id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
      {Boolean(completedTasks.length) && <h2>Tareas completadas</h2>}
      {completedTasks.map((todo) => (
        <TodoItem
          key={todo._id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
    </div>
  );
};

export default HomePage;
