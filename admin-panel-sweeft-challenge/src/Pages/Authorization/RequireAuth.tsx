import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthorizationContext } from "../../Contexts/AuthorizationContext";
import { useEffect } from "react";

const RequireAuth = () => {
  const location = useLocation();
  const { loggedin, setLoggedin } = useAuthorizationContext();

  return loggedin ? (
    <Outlet />
  ) : (
    <Navigate to="admin/auth" state={{ from: location }} replace />
  );
};

export default RequireAuth;
