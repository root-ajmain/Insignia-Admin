import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hook";

const RequireAuth = () => {
  const {
    auth: { user },
  } = useAppSelector((state) => state);
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
