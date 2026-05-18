import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  console.log("CHECK USER:", user);

  if (!token || !user) return <Navigate to="/" />;

  const role = user.role?.toLowerCase();

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;