import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../api/client";

export default function ViewEmployeePage() {
  const { eid } = useParams();
  const navigate = useNavigate();

  // States for employee info + error
  const [empRecord, setEmpRecord] = useState(null);
  const [fetchError, setFetchError] = useState("");

  // Load employee information on mount
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await apiClient.get(`/employee/${eid}`);
        setEmpRecord(response.data);
      } catch (error) {
        setFetchError("Unable to load employee details.");
      }
    };

    fetchEmployeeData();
  }, [eid]);

  // Display error if request fails
  if (fetchError) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{fetchError}</div>
      </div>
    );
  }

  // Loading state
  if (!empRecord) {
    return (
      <div className="container mt-5">
        <h4>Loading employee details...</h4>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: 600, marginTop: 50 }}>
      <div className="card shadow p-4" style={{ borderRadius: "20px" }}>

        <h2 className="fw-bold text-center mb-4">Employee Details</h2>

        {/* Profile Image Display */}
        <div className="text-center mb-3">
          {empRecord.profileImage ? (
            <img
              src={`http://localhost:5000/uploads/${empRecord.profileImage}`}
              alt="Profile"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "50%",
                border: "3px solid #ccc",
              }}
            />
          ) : (
            <div
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                background: "#eee",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "50px",
                color: "#aaa",
                margin: "0 auto",
              }}
            >
              🙍
            </div>
          )}
        </div>

        {/* Employee Details Display */}
        <p><strong>First Name:</strong> {empRecord.first_name}</p>
        <p><strong>Last Name:</strong> {empRecord.last_name}</p>
        <p><strong>Email:</strong> {empRecord.email}</p>
        <p><strong>Position:</strong> {empRecord.position}</p>
        <p><strong>Department:</strong> {empRecord.department}</p>
        <p><strong>Salary:</strong> ${empRecord.salary}</p>
        <p>
          <strong>Date Joined:</strong>{" "}
          {new Date(empRecord.dateOfJoining).toLocaleDateString()}
        </p>

        {/* Action Buttons */}
        <div className="d-flex gap-3 mt-4">
          <button
            className="btn btn-secondary rounded-pill w-50"
            onClick={() => navigate("/employees")}
          >
            Back
          </button>

          <button
            className="btn btn-primary rounded-pill w-50"
            onClick={() => navigate(`/employees/edit/${empRecord._id}`)}
          >
            Edit Employee
          </button>
        </div>
      </div>
    </div>
  );
}
