const TaskForm = ({ form, setForm, onSubmit, editingTaskId, onCancel, isSubmitting }) => {
  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  return (
    <form
      onSubmit={onSubmit}
      className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-5">
        <p className="text-sm font-medium text-slate-500">
          {editingTaskId ? "Update details" : "Create new"}
        </p>
        <h2 className="mt-1 text-xl font-semibold text-ink">
          {editingTaskId ? "Edit task" : "Add task"}
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Title</span>
          <input
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
            name="title"
            placeholder="Design landing page"
            value={form.title}
            onChange={updateField}
            required
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Status</span>
          <select
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
            name="status"
            value={form.status}
            onChange={updateField}
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In progress</option>
            <option value="done">Done</option>
          </select>
        </label>
      </div>
      <label className="mt-4 block">
        <span className="mb-1 block text-sm font-medium text-slate-700">Description</span>
        <textarea
          className="min-h-28 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
          name="description"
          placeholder="Add useful context for this task"
          value={form.description}
          onChange={updateField}
        />
      </label>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-brand px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {isSubmitting ? "Saving..." : editingTaskId ? "Save changes" : "Add task"}
        </button>
        {editingTaskId ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
};

export default TaskForm;
