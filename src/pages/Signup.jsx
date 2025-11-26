import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerNewUser } from "../api/user"; 
// renamed locally — still same API

export default function SignupPage() {
  // Form states
  const [userHandle, setUserHandle] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");

  // UI feedback states
  const [formErrors, setFormErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  // Validate form values before sending to backend
  const validateFields = () => {
    const collectedErrors = {};

    if (!userHandle || userHandle.length < 3) {
      collectedErrors.userHandle = "Username must be at least 3 characters.";
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(userEmail)) {
      collectedErrors.userEmail = "Please enter a valid email address.";
    }

    if (!userPass || userPass.length < 6) {
      collectedErrors.userPass = "Password must be at least 6 characters.";
    }

    setFormErrors(collectedErrors);
    return Object.keys(collectedErrors).length === 0;
  };

  // Handle submitting the signup form
  const processSignup = async (e) => {
    e.preventDefault();
    setSuccessMsg("");

    if (!validateFields()) return;

    try {
      await registerNewUser(userHandle, userEmail, userPass);

      setSuccessMsg("Account created successfully! Redirecting…");

      // Navigate to login after short delay
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setFormErrors({ general: "Failed to create account. Try again." });
    }
  };

  return (
    <div className="container" style={{ maxWidth: 420, marginTop: 90 }}>
      <div className="card shadow p-4">

        <h2 className="text-center fw-bold mb-3">Create Account</h2>

        {/* General Error */}
        {formErrors.general && (
          <div className="alert alert-danger">{formErrors.general}</div>
        )}

        {/* Success Message */}
        {successMsg && (
          <div className="alert alert-success">{successMsg}</div>
        )}

        <form onSubmit={processSignup}>

          {/* Username */}
          <input
            className="form-control mb-1"
            placeholder="Username"
            style={{ borderRadius: "12px" }}
            value={userHandle}
            onChange={(e) => setUserHandle(e.target.value)}
          />
          {formErrors.userHandle && (
            <p className="text-danger small">{formErrors.userHandle}</p>
          )}

          {/* Email */}
          <input
            className="form-control mb-1"
            placeholder="Email"
            style={{ borderRadius: "12px" }}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          {formErrors.userEmail && (
            <p className="text-danger small">{formErrors.userEmail}</p>
          )}

          {/* Password */}
          <input
            type="password"
            className="form-control mb-1"
            placeholder="Password"
            style={{ borderRadius: "12px" }}
            value={userPass}
            onChange={(e) => setUserPass(e.target.value)}
          />
          {formErrors.userPass && (
            <p className="text-danger small">{formErrors.userPass}</p>
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
