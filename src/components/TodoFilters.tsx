import { Filter } from "@/store/todo-store";

type FilterOption = {
  label: string;
  value: Filter;
};

type Counts = {
  remaining: number;
  completed: number;
};

type TodoFiltersProps = {
  filters: FilterOption[];
  activeFilter: Filter;
  onFilterChange: (filter: Filter) => void;
  counts: Counts;
};

export function TodoFilters({
  filters,
  activeFilter,
  onFilterChange,
  counts,
}: TodoFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {filters.map(({ label, value }) => {
          const isActive = activeFilter === value;

          return (
            <button
              key={value}
              type="button"
              onClick={() => onFilterChange(value)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
                isActive
                  ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                  : "border-transparent bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-3 text-sm text-slate-500">
        <span>{counts.remaining} remaining</span>
        <span aria-hidden="true">|</span>
        <span>{counts.completed} completed</span>
      </div>
    </div>
  );
}
