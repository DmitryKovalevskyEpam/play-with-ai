/**
 * @fileoverview Интерфейсы и типы для Todo приложения
 * @author Todo App
 * @version 1.0.0
 */

/**
 * Интерфейс Todo элемента
 * @interface Todo
 * @property {number} id - Уникальный идентификатор задачи
 * @property {string} title - Название задачи
 * @property {boolean} completed - Статус выполнения задачи
 */
export interface Todo {
  /** @type {number} */
  id: number;
  
  /** @type {string} */
  title: string;
  
  /** @type {boolean} */
  completed: boolean;
}

/**
 * Тип фильтра для задач
 * @typedef {'all' | 'active' | 'completed'} FilterType
 */
export type FilterType = 'all' | 'active' | 'completed';

/**
 * Пропсы для компонента TodoItem
 * @interface TodoItemProps
 * @property {Todo} todo - Объект задачи
 * @property {function(number): void} onToggle - Функция переключения статуса
 * @property {function(number): void} onDelete - Функция удаления задачи
 */
export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

/**
 * Пропсы для компонента TodoList
 * @interface TodoListProps
 * @property {Todo[]} todos - Массив задач
 * @property {FilterType} filter - Текущий фильтр
 * @property {function(number): void} onToggle - Функция переключения статуса
 * @property {function(number): void} onDelete - Функция удаления задачи
 */
export interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

/**
 * Пропсы для компонента AddTodo
 * @interface AddTodoProps
 * @property {string} value - Текущее значение поля ввода
 * @property {function(string): void} onChange - Функция изменения значения
 * @property {function(): void} onAdd - Функция добавления задачи
 */
export interface AddTodoProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

/**
 * Пропсы для компонента FilterButtons
 * @interface FilterButtonsProps
 * @property {FilterType} currentFilter - Текущий активный фильтр
 * @property {function(FilterType): void} onFilterChange - Функция изменения фильтра
 * @property {number} totalCount - Общее количество задач
 * @property {number} activeCount - Количество активных задач
 * @property {number} completedCount - Количество завершенных задач
 * @property {function(): void} onClearCompleted - Функция очистки завершенных задач
 */
export interface FilterButtonsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  totalCount: number;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

export default Todo;
