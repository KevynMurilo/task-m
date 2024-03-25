import React, { useState, useEffect } from 'react';
import api from './services/api';
import './App.css';

function App() {
  
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetchTodos(); // Ao montar o componente, busca os todos da API
  }, []); // O array vazio assegura que isso só acontecerá uma vez

  const fetchTodos = async () => {
    try {
      const response = await api.get('/tasks'); // Faz a requisição GET para '/tasks'
      setTodos(response.data); // Atualiza o estado com os todos recebidos da API
    } catch (error) {
      console.error('Erro ao buscar os todos:', error);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addTodo = async () => {
    if (inputValue.trim() !== '') {
      try {
        const response = await api.post('/tasks', { task: inputValue }); // Faz a requisição POST para '/tasks'
        setTodos([...todos, response.data]); // Adiciona o novo todo ao estado
        setInputValue(''); // Limpa o campo de entrada
      } catch (error) {
        console.error('Erro ao adicionar o todo:', error);
      }
    }
  };

  const removeTodo = async (index) => {
    try {
      await api.delete(`/tasks/${todos[index].id}`); // Faz a requisição DELETE para '/tasks/:id'
      setTodos(todos.filter((_, i) => i !== index)); // Remove o todo do estado corretamente
    } catch (error) {
      console.error('Erro ao remover o todo:', error);
    }
  };

  const editTodo = async (index) => {
    const newTodo = prompt('Edit todo:', todos[index].task);
    if (newTodo !== null) {
      try {
        await api.put(`/tasks/${todos[index].id}`, { task: newTodo }); // Faz a requisição PUT para '/tasks/:id'
        const updatedTodos = [...todos];
        updatedTodos[index] = { ...updatedTodos[index], task: newTodo }; // Cria um novo objeto para o todo atualizado
        setTodos(updatedTodos);
      } catch (error) {
        console.error('Erro ao editar o todo:', error);
      }
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
            <span>{todo.task}</span>
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