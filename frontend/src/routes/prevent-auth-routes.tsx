import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/store";

const PreventAuthRoutes = () => {
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.auth.value);
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  return <Outlet />;
};

export default PreventAuthRoutes;
