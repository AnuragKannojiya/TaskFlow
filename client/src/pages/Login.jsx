import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await login(formData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthForm
      title="Log in"
      subtitle="Open your dashboard and keep tasks moving."
      fields={[
        { label: "Email", name: "email", type: "email" },
        { label: "Password", name: "password", type: "password" }
      ]}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      submitLabel="Log in"
      error={error}
      footerText="New to TaskFlow?"
      footerLink="/signup"
      footerLinkText="Create an account"
    />
  );
};

export default Login;
