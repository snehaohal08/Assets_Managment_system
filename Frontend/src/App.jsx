import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import SuperAdmin from "./pages/super_admin/SuperAdmin";
import ProtectedRoute from "./components/ProtectedRoute";

import { IncidentProvider } from "./context/IncidentContext";

function App() {
  return (
    <IncidentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employee-dashboard"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/superadmin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <SuperAdmin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </IncidentProvider>
  );
}

export default App;