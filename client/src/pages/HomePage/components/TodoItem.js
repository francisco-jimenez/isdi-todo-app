import React from "react";

const Todo = ({ todo, updateTodo, deleteTodo }) => {
  const checkTodo = todo.status ? `line-through` : "";

  return (
    <div data-testid="single-todo" className="Card">
      <div className="Card--text">
        <h1 className={checkTodo}>{todo.name}</h1>
        <span className={checkTodo}>{todo.description}</span>
      </div>
      <div className="Card--button">
        {todo.status === false && (
          <button
            onClick={() => updateTodo(todo)}
            data-testid="complete-button"
            className="Card--button__done"
          >
            Completar
          </button>
        )}
        <button
          onClick={() => deleteTodo(todo._id)}
          className="Card--button__delete"
          data-testid="delete-button"
        >
          Borrar
        </button>
      </div>
    </div>
  );
};

export default Todo;
