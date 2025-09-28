export function PageHeader() {
  return (
    <header className="flex flex-col gap-2">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
        Routine Coding Warmup
      </p>
      <h1 className="text-3xl font-bold sm:text-4xl">Todo List</h1>
      <p className="text-sm text-slate-500">
        Add tasks, check them off, and keep track of your progress.
      </p>
    </header>
  );
}
