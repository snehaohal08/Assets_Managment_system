import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  console.log("CHECK ROLE:", role);

  if (!token || !role) return <Navigate to="/" />;

  if (!allowedRoles.includes(role)) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;