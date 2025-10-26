/**
 * @fileoverview Интерфейсы и типы для Todo приложения
 * @author Todo App
 * @version 1.0.0
 */

/**
 * @typedef {Object} Todo
 * @property {number} id - Уникальный идентификатор задачи
 * @property {string} title - Название задачи
 * @property {boolean} completed - Статус выполнения задачи
 */

// Импорт основного интерфейса
import TodoInterface from './TodoInterface.js';

/**
 * Интерфейс для todo элемента
 * @interface Todo
 */
export const TodoInterface = {
  /**
   * @type {number}
   */
  id: 0,
  
  /**
   * @type {string}
   */
  title: '',
  
  /**
   * @type {boolean}
   */
  completed: false
};

/**
 * Создает новый объект Todo
 * @param {number} id - Уникальный идентификатор
 * @param {string} title - Название задачи
 * @param {boolean} completed - Статус выполнения
 * @returns {Todo} Новый объект Todo
 */
export const createTodo = (id, title, completed = false) => ({
  id,
  title,
  completed
});

/**
 * Проверяет, является ли объект валидным Todo
 * @param {any} obj - Объект для проверки
 * @returns {boolean} true если объект валиден
 */
export const isValidTodo = (obj) => {
  return obj && 
         typeof obj.id === 'number' && 
         typeof obj.title === 'string' && 
         typeof obj.completed === 'boolean';
};

export default TodoInterface;
