import client from "./client";

// GET ALL EMPLOYEES
export const getAllEmployees = () => client.get("/api/v1/employee");

// GET EMPLOYEE BY ID
export const getEmployeeById = (id) => client.get(`/api/v1/employee/${id}`);

// CREATE EMPLOYEE (WITH IMAGE)
export const createEmployee = (formData) =>
  client.post("/api/v1/employee", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// UPDATE EMPLOYEE (WITH IMAGE)
export const updateEmployee = (id, formData) =>
  client.put(`/api/v1/employee/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// DELETE EMPLOYEE
export const deleteEmployee = (id) => client.delete(`/api/v1/employee/${id}`);

// SEARCH EMPLOYEES
export const searchEmployees = (department, position) =>
  client.get(
    `/api/v1/employee/search/by?department=${department}&position=${position}`
  );
