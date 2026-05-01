const statusLabels = {
  todo: "Todo",
  "in-progress": "In progress",
  done: "Done"
};

const statusStyles = {
  todo: "bg-slate-100 text-slate-700",
  "in-progress": "bg-amber-50 text-amber-700",
  done: "bg-teal-50 text-mint"
};

const TaskCard = ({ task, onEdit, onDelete, isDeleting }) => {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="break-words text-lg font-semibold text-ink">{task.title}</h3>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                statusStyles[task.status] || statusStyles.todo
              }`}
            >
              {statusLabels[task.status] || "Todo"}
            </span>
          </div>
          {task.description ? (
            <p className="mt-2 whitespace-pre-line break-words text-sm leading-6 text-slate-600">
              {task.description}
            </p>
          ) : (
            <p className="mt-2 text-sm text-slate-400">No description added.</p>
          )}
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => onEdit(task)}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            disabled={isDeleting}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-red-300"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
