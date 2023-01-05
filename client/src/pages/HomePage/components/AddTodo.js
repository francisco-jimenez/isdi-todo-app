import React, { useState } from "react";

const AddTodo = ({ saveTodo }) => {
  const [formData, setFormData] = useState();

  const handleForm = (e) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  return (
    <form
      className="Form"
      onSubmit={(e) => {
        saveTodo(e, formData);
      }}
    >
      <div>
        <div>
          <label htmlFor="name">Nombre</label>
          <input onChange={handleForm} type="text" id="name" />
        </div>
        <div>
          <label htmlFor="description">Descripcion</label>
          <input onChange={handleForm} type="text" id="description" />
        </div>
      </div>
      {formData && formData.name && formData.description && (
        <button data-testid="add-button">Añadir</button>
      )}
    </form>
  );
};

export default AddTodo;
