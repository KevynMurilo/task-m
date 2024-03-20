import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const editTodo = (index) => {
    const newTodo = prompt('Edit todo:', todos[index]);
    if (newTodo !== null) {
      const updatedTodos = [...todos];
      updatedTodos[index] = newTodo;
      setTodos(updatedTodos);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-white">To-Do List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Adicione uma nova tarefa"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary" onClick={addTodo}>
          Adicionar
        </button>
      </div>
      <ul className="list-group">
        {todos.map((todo, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{todo}</span>
            <div>
              <button className="btn btn-warning me-2" onClick={() => editTodo(index)}>
                Editar
              </button>
              <button className="btn btn-danger" onClick={() => removeTodo(index)}>
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;