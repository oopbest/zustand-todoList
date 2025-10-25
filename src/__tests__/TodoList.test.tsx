import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoList } from "@/components/TodoList";
import type { Todo } from "@/store/todo-store";

const baseTodo: Todo = {
  id: "1",
  title: "Write integration tests",
  completed: false,
  createdAt: Date.now(),
};

describe("TodoList component", () => {
  it("renders an empty state message when no todos exist", () => {
    render(
      <TodoList todos={[]} onToggle={vi.fn()} onRemove={vi.fn()} emptyStateLabel="All caught up!" />
    );

    expect(screen.getByText("All caught up!")).toBeInTheDocument();
  });

  it("calls onToggle with the todo id when the checkbox is clicked", async () => {
    const onToggle = vi.fn();
    const user = userEvent.setup();

    render(
      <TodoList
        todos={[baseTodo]}
        onToggle={onToggle}
        onRemove={vi.fn()}
        emptyStateLabel="noop"
      />
    );

    const checkbox = screen.getByRole("checkbox", { name: /mark todo as complete/i });
    await user.click(checkbox);

    expect(onToggle).toHaveBeenCalledWith(baseTodo.id);
  });

  it("calls onRemove when the delete button is pressed", async () => {
    const onRemove = vi.fn();
    const user = userEvent.setup();

    render(
      <TodoList
        todos={[baseTodo]}
        onToggle={vi.fn()}
        onRemove={onRemove}
        emptyStateLabel="noop"
      />
    );

    await user.click(screen.getByRole("button", { name: /delete/i }));
    expect(onRemove).toHaveBeenCalledWith(baseTodo.id);
  });
});
