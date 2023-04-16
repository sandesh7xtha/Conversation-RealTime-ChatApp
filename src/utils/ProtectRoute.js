import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const token = localStorage.getItem("token");

  const user = {
    loggedIn: false,
  };

  if (token) {
    user.loggedIn = true;
  }

  return user.loggedIn;
};

const ProtectRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/LoginPage" />;
};

export default ProtectRoute;
