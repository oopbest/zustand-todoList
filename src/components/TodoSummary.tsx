type Counts = {
  total: number;
  completed: number;
  remaining: number;
};

type TodoSummaryProps = {
  counts: Counts;
  canClearCompleted: boolean;
  onClear: () => void;
};

export function TodoSummary({ counts, canClearCompleted, onClear }: TodoSummaryProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">
        Total tasks: <span className="font-semibold text-slate-700">{counts.total}</span>
      </p>
      <button
        type="button"
        onClick={onClear}
        disabled={!canClearCompleted}
        className="self-start rounded-lg border border-transparent px-4 py-2 text-sm font-semibold text-red-500 transition hover:border-red-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Clear completed
      </button>
    </div>
  );
}
