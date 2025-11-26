import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Employees from "./pages/EmployeeList";
import CreateEmployee from "./pages/CreateEmployee";
import EmployeeDetails from "./pages/EmployeeDetails";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        {/* auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* employees */}
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/create" element={<CreateEmployee />} />
        <Route path="/employees/edit/:eid" element={<CreateEmployee />} />
        <Route path="/employees/detail/:eid" element={<EmployeeDetails />} />

      </Routes>
    </BrowserRouter>
  );
}
