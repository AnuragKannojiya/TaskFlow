import { useEffect, useState } from "react";
import api from "../api/axios.js";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(user);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/auth/profile");
        setProfile(data.user);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <section className="max-w-2xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">Account</p>
              <h1 className="mt-1 text-3xl font-bold text-ink">Profile</h1>
            </div>
            <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-mint">
              Active
            </span>
          </div>
          {error ? (
            <div className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          ) : null}

          {loading ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[1, 2, 3].map((item) => (
                <div key={item} className="rounded-lg border border-slate-200 p-4">
                  <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
                  <div className="mt-3 h-4 w-40 animate-pulse rounded bg-slate-200" />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 p-4">
                <p className="text-sm text-slate-500">Name</p>
                <p className="mt-1 font-semibold text-ink">{profile?.name}</p>
              </div>
              <div className="rounded-lg border border-slate-200 p-4">
                <p className="text-sm text-slate-500">Email</p>
                <p className="mt-1 break-words font-semibold text-ink">{profile?.email}</p>
              </div>
              <div className="rounded-lg border border-slate-200 p-4">
                <p className="text-sm text-slate-500">Member since</p>
                <p className="mt-1 font-semibold text-ink">
                  {profile?.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString()
                    : "New member"}
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Profile;
