import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/user";

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!usernameOrEmail.trim()) {
      newErrors.usernameOrEmail = "Username or email is required.";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      console.log("Attempting login with:", { usernameOrEmail, password });
      const res = await loginUser(usernameOrEmail, password);
      const token = res.data.token || res.data.jwt_token;

      localStorage.setItem("token", token);
      navigate("/employees");
    } catch (err) {
      setErrors({ general: "Invalid login credentials." });
    }
  };

  return (
    <div className="container" style={{ maxWidth: 420, marginTop: 90 }}>
      <div className="card shadow p-4">
        <h2 className="text-center fw-bold mb-4">Login</h2>

        {errors.general && (
          <div className="alert alert-danger">{errors.general}</div>
        )}

        <form onSubmit={handleLogin}>
          <input
            className="form-control mb-1"
            placeholder="Username or Email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            style={{ borderRadius: "12px" }}
          />
          {errors.usernameOrEmail && (
            <p className="text-danger small">{errors.usernameOrEmail}</p>
          )}

          <input
            type="password"
            className="form-control mb-1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ borderRadius: "12px" }}
          />
          {errors.password && (
            <p className="text-danger small">{errors.password}</p>
          )}

          <button className="btn btn-primary w-100 py-2 rounded-pill mt-3">
            Login
          </button>
        </form>

        <p className="mt-3 text-center">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}
