import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import client from "../api/client";

export default function EmployeeDetails() {
  const { eid } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const res = await client.get(`/employee/${eid}`);
        setEmployee(res.data);
      } catch (err) {
        setError("Failed to fetch employee details");
      }
    };

    loadEmployee();
  }, [eid]);

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (!employee) {
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
        <div className="text-center mb-3">
  {employee.profileImage ? (
    <img
      src={`http://localhost:5000/uploads/${employee.profileImage}`}
      alt="Profile"
      style={{
        width: "150px",
        height: "150px",
        objectFit: "cover",
        borderRadius: "50%",
        border: "3px solid #ccc"
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
        margin: "0 auto"
      }}
    >
      🙍
    </div>
  )}
</div>


        <p><strong>First Name:</strong> {employee.first_name}</p>
        <p><strong>Last Name:</strong> {employee.last_name}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Position:</strong> {employee.position}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Salary:</strong> ${employee.salary}</p>
        <p><strong>Date Joined:</strong> {new Date(employee.dateOfJoining).toLocaleDateString()}</p>

        <div className="d-flex gap-3 mt-4">
          <button
            className="btn btn-secondary rounded-pill w-50"
            onClick={() => navigate("/employees")}
          >
            Back
          </button>

          <button
            className="btn btn-primary rounded-pill w-50"
            onClick={() => navigate(`/employees/edit/${employee._id}`)}
          >
            Edit Employee
          </button>
        </div>
      </div>
    </div>
  );
}
