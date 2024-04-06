import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/store";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.auth.value);
  useEffect(() => {
    console.log(">> check isAuth:", isAuth);
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  return <Outlet />;
};

export default PrivateRoutes;
