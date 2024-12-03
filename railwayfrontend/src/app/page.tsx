'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface TodoResponse {
  todos: string[];
}

export default function Home() {
  const [todo, setTodo] = useState<string>('');
  const [todosList, setTodosList] = useState<string[]>([]);

  const BACKEND_URL = "https://backend-production-9639.up.railway.app";

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get<TodoResponse>(`${BACKEND_URL}/`);
      setTodosList(response.data.todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (todo.trim() === '') return;
    try {
      await axios.post(`${BACKEND_URL}/`, { todo }, { headers: { 'Content-Type': 'application/json' } });
      setTodo('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div style={{ paddingRight: '20px'}}>
      <h1>Todo List</h1>
      <input
        style={{ marginRight: '20px'}}
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Enter todo item"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todosList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
