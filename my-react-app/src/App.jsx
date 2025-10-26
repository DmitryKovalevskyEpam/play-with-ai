import { useState } from 'react'
import './App.css'

function App() {
  // Моковые данные для todo элементов
  const initialTodos = [
    { id: 1, title: 'Изучить React', completed: false },
    { id: 2, title: 'Создать todo приложение', completed: true },
    { id: 3, title: 'Добавить фильтрацию', completed: false },
    { id: 4, title: 'Стилизовать интерфейс', completed: false },
    { id: 5, title: 'Протестировать функциональность', completed: false }
  ]

  const [todos, setTodos] = useState(initialTodos)
  const [newTodo, setNewTodo] = useState('')
  const [filter, setFilter] = useState('all') // all, active, completed

  // Добавление нового todo
  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        title: newTodo.trim(),
        completed: false
      }
      setTodos([...todos, todo])
      setNewTodo('')
    }
  }

  // Переключение статуса todo
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  // Фильтрация todo
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <div className="app">
      <div className="container">
        <h1>Todo App</h1>
        
        {/* Форма добавления нового todo */}
        <div className="add-todo">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Добавить новую задачу..."
            className="todo-input"
          />
          <button onClick={addTodo} className="add-button">
            Добавить
          </button>
        </div>

        {/* Фильтры */}
        <div className="filters">
          <button 
            className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('all')}
          >
            Все ({todos.length})
          </button>
          <button 
            className={filter === 'active' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('active')}
          >
            Активные ({todos.filter(t => !t.completed).length})
          </button>
          <button 
            className={filter === 'completed' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('completed')}
          >
            Завершенные ({todos.filter(t => t.completed).length})
          </button>
        </div>

        {/* Список todo */}
        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <p className="empty-message">
              {filter === 'all' ? 'Нет задач' : 
               filter === 'active' ? 'Нет активных задач' : 
               'Нет завершенных задач'}
            </p>
          ) : (
            filteredTodos.map(todo => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="todo-checkbox"
                />
                <span className="todo-title">{todo.title}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App
