import { useState, useEffect } from "react";
import client from "../api/client";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../utils/auth";

export default function CreateEmployee() {
  const navigate = useNavigate();
  const { eid } = useParams();
  const isEdit = Boolean(eid);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    position: "",
    department: "",
    salary: "",
    dateOfJoining: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");

  // Load employee data if editing
  useEffect(() => {
    if (isEdit) {
      const loadEmployee = async () => {
        try {
          const res = await client.get(`/employee/${eid}`);
          setForm(res.data);
        } catch (err) {
          setError("Failed to load employee data.");
        }
      };
      loadEmployee();
    }
  }, [eid, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      if (isEdit) {
        await client.put(`/employee/${eid}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await client.post("/employee", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      navigate("/employees");
    } catch (err) {
      console.error(err);
      setError(`Failed to ${isEdit ? "update" : "create"} employee.`);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 500, marginTop: 50 }}>

      {/* Logout Button */}
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-outline-danger px-3 py-1 rounded-pill fw-bold"
          onClick={logout}
          style={{ borderWidth: "2px" }}
        >
          Logout
        </button>
      </div>

      <div className="card shadow p-4" style={{ borderRadius: "20px" }}>
        <h2 className="fw-bold text-center mb-4">
          {isEdit ? "Edit Employee" : "Create Employee"}
        </h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {Object.keys(form).map((key) => (
            <input
              key={key}
              className="form-control mb-3"
              type={
                key === "salary"
                  ? "number"
                  : key === "dateOfJoining"
                  ? "date"
                  : "text"
              }
              name={key}
              value={form[key]}
              onChange={handleChange}
              placeholder={key.replace(/([A-Z])/g, " $1")}
              style={{
                borderRadius: "12px",
                padding: "10px",
              }}
            />
          ))}

          {/* File upload */}
          <label className="fw-bold mb-1">Profile Image</label>
          <input
            type="file"
            className="form-control mb-3"
            accept="image/*"
            onChange={handleFileChange}
            style={{ borderRadius: "12px" }}
          />

          <button className="btn btn-primary w-100 py-2 rounded-pill">
            {isEdit ? "Update Employee" : "Create Employee"}
          </button>

          <button
            className="btn btn-secondary w-100 py-2 rounded-pill mt-3"
            onClick={() => navigate("/employees")}
            type="button"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
