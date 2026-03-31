// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem("role");

  if (!role) return <Navigate to="/login" />; // not logged in
  if (!allowedRoles.includes(role)) return <Navigate to="/login" />; // wrong role

  return children;
};

export default ProtectedRoute;