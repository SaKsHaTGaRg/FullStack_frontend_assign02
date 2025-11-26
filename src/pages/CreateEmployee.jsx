import { useState, useEffect } from "react";
import apiClient from "../api/client";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../utils/auth";

export default function EmployeeFormPage() {
  const navigate = useNavigate();
  const { eid } = useParams();

  // Determine if form is in edit mode
  const editingMode = Boolean(eid);

  // Form input state
  const [employeeFields, setEmployeeFields] = useState({
    first_name: "",
    last_name: "",
    email: "",
    position: "",
    department: "",
    salary: "",
    dateOfJoining: "",
  });

  // File upload state
  const [uploadedImage, setUploadedImage] = useState(null);

  // Error state
  const [errorMsg, setErrorMsg] = useState("");

  // Load existing employee details when editing
  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await apiClient.get(`/employee/${eid}`);
        setEmployeeFields(response.data);
      } catch (err) {
        setErrorMsg("Unable to load employee data.");
      }
    };

    if (editingMode) fetchEmployeeDetails();
  }, [editingMode, eid]);

  // Handle input field changes
  const handleFieldUpdate = (e) => {
    setEmployeeFields({ ...employeeFields, [e.target.name]: e.target.value });
  };

  // Handle upload field update
  const handleImageUpload = (e) => {
    setUploadedImage(e.target.files[0]);
  };

  // Submit create/edit form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const payload = new FormData();

      // Append all text fields
      Object.entries(employeeFields).forEach(([key, value]) =>
        payload.append(key, value)
      );

      // Append file if uploaded
      if (uploadedImage) {
        payload.append("profileImage", uploadedImage);
      }

      if (editingMode) {
        // PUT → update employee
        await apiClient.put(`/employee/${eid}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // POST → create new employee
        await apiClient.post("/employee", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      navigate("/employees");
    } catch (err) {
      console.error(err);
      setErrorMsg(
        `Failed to ${editingMode ? "update" : "create"} employee.`
      );
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
          {editingMode ? "Edit Employee" : "Add New Employee"}
        </h2>

        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        <form onSubmit={handleFormSubmit} encType="multipart/form-data">

          {/* Dynamic input mapping */}
          {Object.keys(employeeFields).map((fieldName) => (
            <input
              key={fieldName}
              className="form-control mb-3"
              type={
                fieldName === "salary"
                  ? "number"
                  : fieldName === "dateOfJoining"
                  ? "date"
                  : "text"
              }
              name={fieldName}
              value={employeeFields[fieldName]}
              onChange={handleFieldUpdate}
              placeholder={fieldName.replace(/([A-Z])/g, " $1")}
              style={{
                borderRadius: "12px",
                padding: "10px",
              }}
            />
          ))}

          {/* Image upload */}
          <label className="fw-bold mb-1">Profile Image</label>
          <input
            type="file"
            className="form-control mb-3"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ borderRadius: "12px" }}
          />

          <button className="btn btn-primary w-100 py-2 rounded-pill">
            {editingMode ? "Update Employee" : "Create Employee"}
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
