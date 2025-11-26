import apiClient from "./client"; 
// renamed locally, same import path

// Fetch all employees
export const fetchAllEmployees = () => apiClient.get("/api/v1/employee");

// Fetch a single employee by ID
export const fetchEmployeeById = (empId) => 
  apiClient.get(`/api/v1/employee/${empId}`);

// Create a new employee (supports file upload)
export const addNewEmployee = (employeeForm) =>
  apiClient.post("/api/v1/employee", employeeForm, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Update employee details (also supports image upload)
export const reviseEmployee = (empId, employeeForm) =>
  apiClient.put(`/api/v1/employee/${empId}`, employeeForm, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Delete employee using ID
export const removeEmployee = (empId) => 
  apiClient.delete(`/api/v1/employee/${empId}`);

// Search employees by department + position
export const filterEmployees = (dept, role) =>
  apiClient.get(
    `/api/v1/employee/search/by?department=${dept}&position=${role}`
  );
