import { useEffect, useState } from "react";
import api from "../api/axios.js";
import Navbar from "../components/Navbar.jsx";
import TaskCard from "../components/TaskCard.jsx";
import TaskForm from "../components/TaskForm.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const emptyForm = {
  title: "",
  description: "",
  status: "todo"
};

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState("");

  const taskStats = {
    total: tasks.length,
    todo: tasks.filter((task) => task.status === "todo").length,
    progress: tasks.filter((task) => task.status === "in-progress").length,
    done: tasks.filter((task) => task.status === "done").length
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/tasks");
      setTasks(data.tasks);
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Could not load tasks" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingTaskId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage({ type: "", text: "" });
    setSaving(true);

    try {
      if (editingTaskId) {
        await api.put(`/tasks/${editingTaskId}`, form);
        setMessage({ type: "success", text: "Task updated successfully." });
      } else {
        await api.post("/tasks", form);
        setMessage({ type: "success", text: "Task added successfully." });
      }

      resetForm();
      fetchTasks();
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Could not save task" });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setForm({
      title: task.title,
      description: task.description || "",
      status: task.status
    });
  };

  const handleDelete = async (taskId) => {
    setMessage({ type: "", text: "" });
    setDeletingTaskId(taskId);

    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks((current) => current.filter((task) => task._id !== taskId));
      setMessage({ type: "success", text: "Task deleted successfully." });
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Could not delete task" });
    } finally {
      setDeletingTaskId("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Welcome back, {user?.name}</p>
            <h1 className="mt-1 text-3xl font-bold text-ink">Dashboard</h1>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-500">
            Add tasks, update progress, and keep your work organized from one private workspace.
          </p>
        </div>

        <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Total", taskStats.total, "border-slate-200"],
            ["Todo", taskStats.todo, "border-slate-200"],
            ["In progress", taskStats.progress, "border-amber-200"],
            ["Done", taskStats.done, "border-teal-200"]
          ].map(([label, value, borderClass]) => (
            <div key={label} className={`rounded-lg border ${borderClass} bg-white p-4 shadow-sm`}>
              <p className="text-sm font-medium text-slate-500">{label}</p>
              <p className="mt-2 text-3xl font-bold text-ink">{value}</p>
            </div>
          ))}
        </section>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <TaskForm
            form={form}
            setForm={setForm}
            onSubmit={handleSubmit}
            editingTaskId={editingTaskId}
            onCancel={resetForm}
            isSubmitting={saving}
          />

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-ink">Your tasks</h2>
              <span className="text-sm text-slate-500">Latest first</span>
            </div>

            {message.text ? (
              <div
                className={`mb-4 rounded-md border px-4 py-3 text-sm font-medium ${
                  message.type === "error"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-teal-200 bg-teal-50 text-teal-700"
                }`}
              >
                {message.text}
              </div>
            ) : null}

            {loading ? (
              <div className="grid gap-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
                    <div className="mt-4 h-3 w-full animate-pulse rounded bg-slate-100" />
                    <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-slate-100" />
                  </div>
                ))}
              </div>
            ) : tasks.length ? (
              <div className="grid gap-4">
                {tasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isDeleting={deletingTaskId === task._id}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
                <p className="text-lg font-semibold text-ink">No tasks yet</p>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Add your first task using the form, then track it here as your work moves forward.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
