import { Link, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const previewTasks = [
  { title: "Create API endpoints", status: "Done", width: "100%" },
  { title: "Polish dashboard cards", status: "In progress", width: "68%" },
  { title: "Prepare submission notes", status: "Todo", width: "28%" }
];

const Home = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl items-center gap-10 px-4 py-10 sm:py-16 lg:grid-cols-[1.08fr_0.92fr]">
        <section className="max-w-3xl">
          <span className="inline-flex rounded-full border border-blue-100 bg-white px-3 py-1 text-sm font-semibold text-brand shadow-sm">
            MERN task management
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
            Plan, track, and finish tasks in one clean workspace.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            TaskFlow keeps everyday work organized with private accounts, fast task updates, and a
            dashboard that stays easy to scan.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/signup"
              className="inline-flex justify-center rounded-md bg-brand px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
            >
              Get started
            </Link>
            <Link
              to="/login"
              className="inline-flex justify-center rounded-md border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-100"
            >
              Log in
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              ["JWT", "Protected routes"],
              ["CRUD", "Full task control"],
              ["Atlas", "Cloud database"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-lg font-bold text-ink">{label}</p>
                <p className="mt-1 text-sm text-slate-500">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/70 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">Today</p>
              <h2 className="text-xl font-semibold text-ink">Dashboard preview</h2>
            </div>
            <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-mint">
              Live
            </span>
          </div>
          <div className="space-y-4">
            {previewTasks.map((task) => (
              <div key={task.title} className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-semibold text-ink">{task.title}</p>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    {task.status}
                  </span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-brand" style={{ width: task.width }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-lg bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">This week</p>
            <div className="mt-3 grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-2xl font-bold text-ink">12</p>
                <p className="text-xs text-slate-500">Tasks</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-ink">8</p>
                <p className="text-xs text-slate-500">Done</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-ink">4</p>
                <p className="text-xs text-slate-500">Open</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
