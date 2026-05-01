import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, signup } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await signup(formData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <AuthForm
      title="Create account"
      subtitle="Start managing your tasks in one focused workspace."
      fields={[
        { label: "Name", name: "name", type: "text" },
        { label: "Email", name: "email", type: "email" },
        { label: "Password", name: "password", type: "password" }
      ]}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      submitLabel="Sign up"
      error={error}
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Log in"
    />
  );
};

export default Signup;
