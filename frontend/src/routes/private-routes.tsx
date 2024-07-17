import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "stores/store";

const PrivateRoutes = () => {
  const { isAuth } = useAppSelector((state) => state.auth.value);
  if (isAuth) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoutes;
