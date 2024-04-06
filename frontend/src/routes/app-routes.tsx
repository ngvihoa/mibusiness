import { Route, Routes } from "react-router-dom";
import Users from "../components/manage-users/users";
import Login from "../components/login/login";
import Signup from "../components/signup/signup";
import PrivateRoutes from "./private-routes";

const AppRoutes = () => {
  /**
   * idea: after logged in, backend will send list of routes that user can access
   */
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/users" element={<Users />} />
          <Route path="/projects" element={<>Projects</>} />
        </Route>
        <Route path="/" element={<>Hello Home</>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<>404</>} />
      </Routes>
    </>
  );
};

export default AppRoutes;
