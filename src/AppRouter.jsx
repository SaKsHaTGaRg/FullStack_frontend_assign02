import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/Login"; 
import SignupPage from "./pages/Signup";
import StaffDirectoryPage from "./pages/EmployeeList";
import EmployeeFormPage from "./pages/CreateEmployee";
import ViewEmployeePage from "./pages/EmployeeDetails";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect root → login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Authentication pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Employee management pages */}
        <Route path="/employees" element={<StaffDirectoryPage />} />
        <Route path="/employees/create" element={<EmployeeFormPage />} />
        <Route path="/employees/edit/:eid" element={<EmployeeFormPage />} />
        <Route path="/employees/detail/:eid" element={<ViewEmployeePage />} />

      </Routes>
    </BrowserRouter>
  );
}
