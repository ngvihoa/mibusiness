import { Route, Routes } from "react-router-dom";
import Users from "src/components/manage-users/users";
import Login from "src/components/login/login";
import Signup from "src/components/signup/signup";
import PrivateRoutes from "./private-routes";
import PreventAuthRoutes from "./prevent-auth-routes";

const AppRoutes = () => {
  /**
   * idea: after logged in, backend will send list of routes that user can access
   */
  return (
    <>
      <Routes>
        <Route path="/" element={<>Hello Home</>} />
        <Route element={<PreventAuthRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/users" element={<Users />} />
          <Route path="/projects" element={<>Projects</>} />
        </Route>
        <Route path="*" element={<>404</>} />
      </Routes>
    </>
  );
};

export default AppRoutes;
