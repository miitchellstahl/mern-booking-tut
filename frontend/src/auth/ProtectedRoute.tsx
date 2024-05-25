import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const ProtectedRoute = () => {
  const { isLoading, isLoggedIn } = useAppContext();
  console.log("LOADING" + isLoading);

  if (isLoading) {
    return null;
  }

  if (isLoggedIn) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
