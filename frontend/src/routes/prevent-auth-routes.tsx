import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "stores/store";

const PreventAuthRoutes = () => {
  const { isAuth } = useAppSelector((state) => state.auth.value);
  if (!isAuth) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default PreventAuthRoutes;
