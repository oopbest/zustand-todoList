"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  Filter,
  selectCounts,
  selectVisibleTodos,
  useTodoStore,
} from "@/store/todo-store";
import { PageHeader } from "@/components/PageHeader";
import { TodoForm } from "@/components/TodoForm";
import { TodoFilters } from "@/components/TodoFilters";
import { TodoList } from "@/components/TodoList";
import { TodoSummary } from "@/components/TodoSummary";

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
        <PageHeader />

        <TodoForm
          value={input}
          onChange={(value) => setInput(value)}
          onSubmit={handleSubmit}
        />

        <section className="rounded-xl bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4">
            <TodoFilters
              filters={filters}
              activeFilter={activeFilter}
              onFilterChange={setFilter}
              counts={counts}
            />

            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onRemove={removeTodo}
              emptyStateLabel={emptyStateLabel}
            />

            <TodoSummary
              counts={counts}
              canClearCompleted={canClearCompleted}
              onClear={clearCompleted}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
