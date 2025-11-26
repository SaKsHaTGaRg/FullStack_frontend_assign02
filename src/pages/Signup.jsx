import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../api/user";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!username || username.length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
    }

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSuccess("");

    if (!validate()) return;

    try {
      await signupUser(username, email, password);
      setSuccess("Account created successfully! Redirecting…");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setErrors({ general: "Failed to create account. Try again." });
    }
  };

  return (
    <div className="container" style={{ maxWidth: 420, marginTop: 90 }}>
      <div className="card shadow p-4">
        <h2 className="text-center fw-bold mb-3">Create Account</h2>

        {errors.general && (
          <div className="alert alert-danger">{errors.general}</div>
        )}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSignup}>
          <input
            className="form-control mb-1"
            placeholder="Username"
            style={{ borderRadius: "12px" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <p className="text-danger small">{errors.username}</p>
          )}

          <input
            className="form-control mb-1"
            placeholder="Email"
            style={{ borderRadius: "12px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-danger small">{errors.email}</p>
          )}

          <input
            type="password"
            className="form-control mb-1"
            placeholder="Password"
            style={{ borderRadius: "12px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-danger small">{errors.password}</p>
          )}

          <button className="btn btn-success w-100 py-2 rounded-pill mt-3">
            Create Account
          </button>
        </form>

        <p className="mt-3 text-center">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
