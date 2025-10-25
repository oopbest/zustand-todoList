import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  selectCounts,
  selectVisibleTodos,
  type Todo,
  type TodoState,
  useTodoStore,
} from "@/store/todo-store";

const resetStore = () => {
  useTodoStore.setState({ todos: [], filter: "all" });
};

const addSampleTodos = () => {
  const { addTodo } = useTodoStore.getState();
  addTodo("First task");
  addTodo("Second task");
};

const buildState = (partial: Partial<TodoState> = {}): TodoState => ({
  todos: [],
  filter: "all",
  addTodo: vi.fn(),
  toggleTodo: vi.fn(),
  removeTodo: vi.fn(),
  setFilter: vi.fn(),
  clearCompleted: vi.fn(),
  ...partial,
});

describe("useTodoStore state updates", () => {
  beforeEach(() => {
    resetStore();
  });

  it("adds trimmed todos to the top of the list", () => {
    const { addTodo } = useTodoStore.getState();

    addTodo("   First task   ");
    addTodo("Second task");

    const todos = useTodoStore.getState().todos;
    expect(todos).toHaveLength(2);
    expect(todos[0].title).toBe("Second task");
    expect(todos[1].title).toBe("First task");
  });

  it("ignores empty submissions", () => {
    const { addTodo } = useTodoStore.getState();

    addTodo("   ");
    expect(useTodoStore.getState().todos).toHaveLength(0);
  });

  it("toggles a todo completion state by id", () => {
    addSampleTodos();
    const todoId = useTodoStore.getState().todos[0].id;

    useTodoStore.getState().toggleTodo(todoId);
    expect(useTodoStore.getState().todos[0].completed).toBe(true);

    useTodoStore.getState().toggleTodo(todoId);
    expect(useTodoStore.getState().todos[0].completed).toBe(false);
  });

  it("removes todos by id", () => {
    addSampleTodos();
    const [first, second] = useTodoStore.getState().todos;

    useTodoStore.getState().removeTodo(first.id);
    const remaining = useTodoStore.getState().todos;

    expect(remaining).toHaveLength(1);
    expect(remaining[0].id).toBe(second.id);
  });

  it("clears completed todos only", () => {
    addSampleTodos();
    const todos = useTodoStore.getState().todos;
    useTodoStore.getState().toggleTodo(todos[0].id);

    useTodoStore.getState().clearCompleted();

    const remaining = useTodoStore.getState().todos;
    expect(remaining).toHaveLength(1);
    expect(remaining[0].completed).toBe(false);
  });

  it("updates the active filter", () => {
    const { setFilter } = useTodoStore.getState();

    setFilter("completed");
    expect(useTodoStore.getState().filter).toBe("completed");
  });
});

describe("store selectors", () => {
  const sampleTodos: Todo[] = [
    { id: "1", title: "Incomplete", completed: false, createdAt: 1 },
    { id: "2", title: "Complete one", completed: true, createdAt: 2 },
    { id: "3", title: "Complete two", completed: true, createdAt: 3 },
  ];

  it("returns todos that respect the active filter", () => {
    const activeState = buildState({ todos: sampleTodos, filter: "active" });
    const completedState = buildState({ todos: sampleTodos, filter: "completed" });

    expect(selectVisibleTodos(activeState)).toEqual([sampleTodos[0]]);
    expect(selectVisibleTodos(completedState)).toEqual(sampleTodos.slice(1));
  });

  it("falls back to all todos when the filter is all", () => {
    const state = buildState({ todos: sampleTodos, filter: "all" });
    expect(selectVisibleTodos(state)).toEqual(sampleTodos);
  });

  it("computes total, completed, and remaining counts", () => {
    const counts = selectCounts(buildState({ todos: sampleTodos }));
    expect(counts).toEqual({ total: 3, completed: 2, remaining: 1 });
  });
});
