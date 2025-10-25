import { FormEvent } from "react";

type TodoFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function TodoForm({ value, onChange, onSubmit }: TodoFormProps) {
  const isDisabled = !value.trim();

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full flex-col gap-3 rounded-xl bg-white p-4 shadow-sm sm:flex-row"
    >
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="What needs to be done?"
        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring focus:ring-emerald-100"
        aria-label="Todo description"
      />
      <button
        type="submit"
        className="rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isDisabled}
      >
        Add Task
      </button>
      <button
        type="button"
        onClick={() => onChange("")}
        disabled={!value}
        className="rounded-lg border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Clear
      </button>
    </form>
  );
}
