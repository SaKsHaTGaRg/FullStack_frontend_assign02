import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticateUser } from "../api/user"; 
// renamed locally; same path + still works

export default function LoginPage() {
  // Form field states
  const [identifier, setIdentifier] = useState("");  // username or email
  const [passInput, setPassInput] = useState("");

  // Error handling state
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  // Basic validation before sending request
  const validateFields = () => {
    const errBag = {};

    if (!identifier.trim()) {
      errBag.identifier = "Username or email is required.";
    }
    if (!passInput.trim()) {
      errBag.passInput = "Password is required.";
    }

    setFormErrors(errBag);
    return Object.keys(errBag).length === 0;
  };

  // Submit login credentials
  const processLogin = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    try {
      console.log("Logging in with:", { identifier, passInput });

      const response = await authenticateUser(identifier, passInput);

      // Backend sometimes returns token under different keys
      const tokenValue = response.data.jwt_token || response.data.token;

      // Save token for axios interceptor
      localStorage.setItem("token", tokenValue);

      navigate("/employees");
    } catch (err) {
      setFormErrors({ general: "Invalid login credentials." });
    }
  };

  return (
    <div className="container" style={{ maxWidth: 420, marginTop: 90 }}>
      <div className="card shadow p-4">
        <h2 className="text-center fw-bold mb-4">Login</h2>

        {/* General Error */}
        {formErrors.general && (
          <div className="alert alert-danger">{formErrors.general}</div>
        )}

        <form onSubmit={processLogin}>
          {/* Username / Email */}
          <input
            className="form-control mb-1"
            placeholder="Username or Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            style={{ borderRadius: "12px" }}
          />
          {formErrors.identifier && (
            <p className="text-danger small">{formErrors.identifier}</p>
          )}

          {/* Password */}
          <input
            type="password"
            className="form-control mb-1"
            placeholder="Password"
            value={passInput}
            onChange={(e) => setPassInput(e.target.value)}
            style={{ borderRadius: "12px" }}
          />
          {formErrors.passInput && (
            <p className="text-danger small">{formErrors.passInput}</p>
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
