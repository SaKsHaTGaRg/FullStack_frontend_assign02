import { useEffect, useState } from 'react';
import client from "../api/client";
import { useNavigate } from 'react-router-dom';
import { logout } from "../utils/auth";


export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await client.get("/employee/");
      setEmployees(response.data);
    } catch (err) {
      setError("Failed to fetch employees");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await client.delete(`/employee/${id}`);
      setEmployees(employees.filter((emp) => emp.employee_id !== id));
    } catch (err) {
      setError("Failed to delete employee");
    }
  };

  // SEARCH FUNCTION
  const handleSearch = async () => {
    try {
      console.log("Searching for:", department, position);
      const res = await client.get(
        `/employee/search/by?department=${department}&position=${position}`
      );
      setEmployees(res.data);
    } catch (err) {
      setError("No matching employees found. ");
    }
  };

  // RESET FUNCTION
  const resetSearch = async () => {
    setDepartment("");
    setPosition("");
    fetchEmployees();
  };

  return (
    <div className="container" style={{ maxWidth: 1000, marginTop: 40 }}>
      <div className="card shadow p-4" style={{ borderRadius: "20px" }}>

        {/* HEADER + BUTTONS */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Employee List</h2>

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

        {/* SEARCH BAR */}
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
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            style={{ maxWidth: "220px", borderRadius: "10px" }}
          />

          <input
            type="text"
            className="form-control"
            placeholder="Filter by Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            style={{ maxWidth: "220px", borderRadius: "10px" }}
          />

          <button
            className="btn btn-primary rounded-pill px-4"
            onClick={handleSearch}
          >
            Search
          </button>

          <button
            className="btn btn-secondary rounded-pill px-4"
            onClick={resetSearch}
          >
            Reset
          </button>
        </div>

        {/* ERROR */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* TABLE */}
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
            {employees.map((emp) => (
              <tr key={emp.employee_id}>
                <td>{emp.first_name}</td>
                <td>{emp.last_name}</td>
                <td>{emp.email}</td>
                <td>{emp.position}</td>
                <td>{emp.department}</td>
                <td>{emp.salary}</td>
                <td>{new Date(emp.dateOfJoining).toLocaleDateString()}</td>

                <td>

                  <button
                    className="btn btn-info btn-sm rounded-pill me-2"
                    onClick={()=>{
                      navigate(`/employees/detail/${emp.employee_id}`)
                    }
                    }
                  >
                    View Details
                  </button>
                  <button
                    className="btn btn-primary btn-sm rounded-pill me-2"
                    onClick={() =>
                      navigate(`/employees/edit/${emp.employee_id}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm rounded-pill"
                    onClick={() => handleDelete(emp.employee_id)}
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
