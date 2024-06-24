import { Navigate, Route, Routes } from "react-router-dom";
import Users from "src/components/users/users";
import Login from "src/components/login/login";
import Signup from "src/components/signup/signup";
import PrivateRoutes from "./private-routes";
import PreventAuthRoutes from "./prevent-auth-routes";
import Roles from "src/components/roles/roles";
import RolesDisplay from "src/components/roles/roles-display";
import RolesAdding from "src/components/roles/roles-adding";

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
          <Route path="/roles" element={<Roles />}>
            <Route path="" element={<Navigate to="display" replace />} />
            <Route path="display" element={<RolesDisplay />} />
            <Route path="adding" element={<RolesAdding />} />
          </Route>
          <Route path="/projects" element={<>Projects</>} />
        </Route>
        <Route path="*" element={<>404</>} />
      </Routes>
    </>
  );
};

export default AppRoutes;
