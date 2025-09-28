"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  Filter,
  selectCounts,
  selectVisibleTodos,
  useTodoStore,
} from "@/store/todo-store";

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

export default function Home() {
  const [input, setInput] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const setFilter = useTodoStore((state) => state.setFilter);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);
  const activeFilter = useTodoStore((state) => state.filter);
  const todos = useTodoStore(selectVisibleTodos);
  const counts = useTodoStore(selectCounts);

  const canClearCompleted = counts.completed > 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim()) {
      return;
    }

    addTodo(input);
    setInput("");
  };

  const emptyStateLabel = useMemo(() => {
    if (counts.total === 0) {
      return "Start by adding your first task.";
    }

    if (activeFilter === "completed") {
      return "No completed tasks yet.";
    }

    return "Nothing to do here.";
  }, [activeFilter, counts.total]);

  return (
    <main className="min-h-screen bg-slate-50 py-16 text-slate-900">
      <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
            Routine Coding Warmup
          </p>
          <h1 className="text-3xl font-bold sm:text-4xl">Todo List</h1>
          <p className="text-sm text-slate-500">
            Add tasks, check them off, and keep track of your progress.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-3 rounded-xl bg-white p-4 shadow-sm sm:flex-row"
        >
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="What needs to be done?"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring focus:ring-emerald-100"
            aria-label="Todo description"
          />
          <button
            type="submit"
            className="rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!input.trim()}
          >
            Add Task
          </button>
        </form>

        <section className="rounded-xl bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {filters.map(({ label, value }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFilter(value)}
                    className={`rounded-full border px-4 py-1.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
                      activeFilter === value
                        ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                        : "border-transparent bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <span>{counts.remaining} remaining</span>
                <span aria-hidden="true">•</span>
                <span>{counts.completed} completed</span>
              </div>
            </div>

            <ul className="flex flex-col gap-2" role="list">
              {todos.length > 0 ? (
                todos.map((todo) => (
                  <li
                    key={todo.id}
                    className="group flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-emerald-200 hover:shadow"
                  >
                    <label className="flex flex-1 cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="size-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        aria-label={todo.completed ? "Mark todo as incomplete" : "Mark todo as complete"}
                      />
                      <span
                        className={`text-base transition ${
                          todo.completed ? "text-slate-400 line-through" : "text-slate-700"
                        }`}
                      >
                        {todo.title}
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => removeTodo(todo.id)}
                      className="rounded-md border border-transparent px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400 transition hover:border-red-100 hover:bg-red-50 hover:text-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
                    >
                      Delete
                    </button>
                  </li>
                ))
              ) : (
                <li className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                  {emptyStateLabel}
                </li>
              )}
            </ul>

            <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Total tasks: <span className="font-semibold text-slate-700">{counts.total}</span>
              </p>
              <button
                type="button"
                onClick={clearCompleted}
                disabled={!canClearCompleted}
                className="self-start rounded-lg border border-transparent px-4 py-2 text-sm font-semibold text-red-500 transition hover:border-red-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Clear completed
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
