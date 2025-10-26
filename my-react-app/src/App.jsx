import { useState } from 'react'
import './App.css'
import { createTodo, isValidTodo } from './types/Todo.js'

/**
 * Основной компонент Todo приложения
 * @returns {JSX.Element} React компонент
 */
function App() {
  // Моковые данные для todo элементов
  /** @type {Todo[]} */
  const initialTodos = [
    createTodo(1, 'Изучить React', false),
    createTodo(2, 'Создать todo приложение', true),
    createTodo(3, 'Добавить фильтрацию', false),
    createTodo(4, 'Стилизовать интерфейс', false),
    createTodo(5, 'Протестировать функциональность', false)
  ]

  /** @type {[Todo[], function]} */
  const [todos, setTodos] = useState(initialTodos)
  /** @type {[string, function]} */
  const [newTodo, setNewTodo] = useState('')
  /** @type {[string, function]} */
  const [filter, setFilter] = useState('all') // all, active, completed

  /**
   * Добавляет новую задачу в список
   * @returns {void}
   */
  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = createTodo(Date.now(), newTodo.trim(), false)
      setTodos([...todos, todo])
      setNewTodo('')
    }
  }

  /**
   * Переключает статус выполнения задачи
   * @param {number} id - ID задачи
   * @returns {void}
   */
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  /**
   * Удаляет задачу по ID
   * @param {number} id - ID задачи для удаления
   * @returns {void}
   */
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  /**
   * Удаляет все завершенные задачи
   * @returns {void}
   */
  const deleteCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  /**
   * Фильтрует задачи по статусу
   * @returns {Todo[]} Отфильтрованный массив задач
   */
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
            onChange={(/** @type {React.ChangeEvent<HTMLInputElement>} */ e) => setNewTodo(e.target.value)}
            onKeyPress={(/** @type {React.KeyboardEvent<HTMLInputElement>} */ e) => e.key === 'Enter' && addTodo()}
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
            onClick={(/** @type {React.MouseEvent<HTMLButtonElement>} */ e) => setFilter('all')}
          >
            Все ({todos.length})
          </button>
          <button 
            className={filter === 'active' ? 'filter-btn active' : 'filter-btn'}
            onClick={(/** @type {React.MouseEvent<HTMLButtonElement>} */ e) => setFilter('active')}
          >
            Активные ({todos.filter(t => !t.completed).length})
          </button>
          <button 
            className={filter === 'completed' ? 'filter-btn active' : 'filter-btn'}
            onClick={(/** @type {React.MouseEvent<HTMLButtonElement>} */ e) => setFilter('completed')}
          >
            Завершенные ({todos.filter(t => t.completed).length})
          </button>
          {todos.filter(t => t.completed).length > 0 && (
            <button 
              className="clear-completed-btn"
              onClick={deleteCompletedTodos}
              title="Удалить все завершенные задачи"
            >
              Очистить завершенные
            </button>
          )}
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
                  onChange={(/** @type {React.ChangeEvent<HTMLInputElement>} */ e) => toggleTodo(todo.id)}
                  className="todo-checkbox"
                />
                <span className="todo-title">{todo.title}</span>
                <button 
                  onClick={(/** @type {React.MouseEvent<HTMLButtonElement>} */ e) => deleteTodo(todo.id)}
                  className="delete-button"
                  title="Удалить задачу"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App
