import { useEffect, useState } from "react";
import apiClient from "../api/client";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

export default function StaffDirectoryPage() {
  // State variables
  const [staffRecords, setStaffRecords] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [deptFilter, setDeptFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const navigate = useNavigate();

  // Load all employees on component mount
  useEffect(() => {
    retrieveStaffList();
  }, []);

  // Fetch employees from backend
  const retrieveStaffList = async () => {
    try {
      const response = await apiClient.get("/employee/");
      setStaffRecords(response.data);
    } catch (error) {
      setErrorMsg("Unable to load employee data.");
    }
  };

  // DELETE employee
  const removeEmployee = async (empId) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await apiClient.delete(`/employee/${empId}`);
      setStaffRecords(staffRecords.filter((item) => item.employee_id !== empId));
    } catch (error) {
      setErrorMsg("Failed to delete employee record.");
    }
  };

  // SEARCH employees
  const executeSearch = async () => {
    try {
      const response = await apiClient.get(
        `/employee/search/by?department=${deptFilter}&position=${roleFilter}`
      );
      setStaffRecords(response.data);
    } catch (error) {
      setErrorMsg("No employees match your search criteria.");
    }
  };

  // RESET search fields
  const clearFilters = () => {
    setDeptFilter("");
    setRoleFilter("");
    retrieveStaffList();
  };

  return (
    <div className="container" style={{ maxWidth: 1000, marginTop: 40 }}>
      <div className="card shadow p-4" style={{ borderRadius: "20px" }}>
        
        {/* PAGE HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Employee Directory</h2>

          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-danger fw-bold px-3 py-2 rounded-pill"
              onClick={logout}
              style={{ borderWidth: "2px" }}
            >
              Logout
            </button>

            <button
              className="btn btn-success px-4 py-2 rounded-pill"
              onClick={() => navigate("/employees/create")}
            >
              + Add Employee
            </button>
          </div>
        </div>

        {/* SEARCH AREA */}
        <div
          className="d-flex align-items-center gap-3 p-3 mb-4"
          style={{
            background: "#f8f9fa",
            borderRadius: "15px",
            border: "1px solid #e1e1e1",
          }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Filter by Department"
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            style={{ maxWidth: "220px", borderRadius: "10px" }}
          />

          <input
            type="text"
            className="form-control"
            placeholder="Filter by Position"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            style={{ maxWidth: "220px", borderRadius: "10px" }}
          />

          <button
            className="btn btn-primary rounded-pill px-4"
            onClick={executeSearch}
          >
            Search
          </button>

          <button
            className="btn btn-secondary rounded-pill px-4"
            onClick={clearFilters}
          >
            Reset
          </button>
        </div>

        {/* ERROR DISPLAY */}
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        {/* EMPLOYEE TABLE */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Date Joined</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {staffRecords.map((record) => (
              <tr key={record.employee_id}>
                <td>{record.first_name}</td>
                <td>{record.last_name}</td>
                <td>{record.email}</td>
                <td>{record.position}</td>
                <td>{record.department}</td>
                <td>{record.salary}</td>
                <td>{new Date(record.dateOfJoining).toLocaleDateString()}</td>

                <td>
                  <button
                    className="btn btn-info btn-sm rounded-pill me-2"
                    onClick={() =>
                      navigate(`/employees/detail/${record.employee_id}`)
                    }
                  >
                    View
                  </button>

                  <button
                    className="btn btn-primary btn-sm rounded-pill me-2"
                    onClick={() =>
                      navigate(`/employees/edit/${record.employee_id}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm rounded-pill"
                    onClick={() => removeEmployee(record.employee_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
