import { Todo } from "@/store/todo-store";

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  emptyStateLabel: string;
};

export function TodoList({ todos, onToggle, onRemove, emptyStateLabel }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <ul className="flex flex-col gap-2" role="list">
        <li className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
          {emptyStateLabel}
        </li>
      </ul>
    );
  }

  return (
    <ul className="flex flex-col gap-2" role="list">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="group flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-emerald-200 hover:shadow"
        >
          <label className="flex flex-1 cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
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
            onClick={() => onRemove(todo.id)}
            className="rounded-md border border-transparent px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400 transition hover:border-red-100 hover:bg-red-50 hover:text-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
