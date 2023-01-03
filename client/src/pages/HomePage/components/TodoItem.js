import React from "react";

const Todo = ({ todo, updateTodo, deleteTodo }) => {
  const checkTodo = todo.status ? `line-through` : "";

  return (
    <div className="Card">
      <div className="Card--text">
        <h1 className={checkTodo}>{todo.name}</h1>
        <span className={checkTodo}>{todo.description}</span>
      </div>
      <div className="Card--button">
        <button
          onClick={() => updateTodo(todo)}
          className={todo.status ? `hide-button` : "Card--button__done"}
        >
          Completar
        </button>
        <button
          onClick={() => deleteTodo(todo._id)}
          className="Card--button__delete"
        >
          Borrar
        </button>
      </div>
    </div>
  );
};

export default Todo;
