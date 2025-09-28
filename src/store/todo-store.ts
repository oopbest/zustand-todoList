import { create } from "zustand";

type Filter = "all" | "active" | "completed";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
};

type TodoState = {
  todos: Todo[];
  filter: Filter;
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  setFilter: (filter: Filter) => void;
  clearCompleted: () => void;
};

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return Math.random().toString(36).slice(2, 11);
};

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  filter: "all",
  addTodo: (title) =>
    set((state) => {
      const trimmed = title.trim();
      if (!trimmed) {
        return state;
      }

      const nextTodo: Todo = {
        id: createId(),
        title: trimmed,
        completed: false,
        createdAt: Date.now(),
      };

      return { todos: [nextTodo, ...state.todos] };
    }),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  setFilter: (filter) => set(() => ({ filter })),
  clearCompleted: () =>
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    })),
}));

export const selectVisibleTodos = (state: TodoState) => {
  switch (state.filter) {
    case "active":
      return state.todos.filter((todo) => !todo.completed);
    case "completed":
      return state.todos.filter((todo) => todo.completed);
    default:
      return state.todos;
  }
};

export const selectCounts = (state: TodoState) => {
  const total = state.todos.length;
  const completed = state.todos.filter((todo) => todo.completed).length;
  return {
    total,
    completed,
    remaining: total - completed,
  };
};

export type { Todo, Filter, TodoState };
