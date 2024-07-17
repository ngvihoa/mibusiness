import { Navigate, Route, Routes } from "react-router-dom";
import Users from "components/_users/users";
import Login from "components/_auth/login";
import Signup from "components/_auth/signup";
import PrivateRoutes from "./private-routes";
import PreventAuthRoutes from "./prevent-auth-routes";
import Roles from "components/_roles/roles";
import RolesDisplay from "components/_roles/roles-display";
import RolesAdding from "components/_roles/roles-adding";
import RolesAssign from "components/_roles/roles-assign";
import Home from "components/_home/home";
import UserList from "components/_users/user-list";
import UserGroup from "components/_users/user-group";
import GroupsAdding from "components/_users/groups-adding";
import Projects from "components/_projects/projects";

const AppRoutes = () => {
  /**
   * idea: after logged in, backend will send list of routes that user can access
   */
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PreventAuthRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/users" element={<Users />}>
            <Route path="" element={<Navigate to="list" replace />} />
            <Route path="list" element={<UserList />} />
            <Route path="group" element={<UserGroup />} />
            <Route path="group-adding" element={<GroupsAdding />} />
          </Route>
          <Route path="/roles" element={<Roles />}>
            <Route path="" element={<Navigate to="display" replace />} />
            <Route path="display" element={<RolesDisplay />} />
            <Route path="adding" element={<RolesAdding />} />
            <Route path="assign" element={<RolesAssign />} />
          </Route>
          <Route path="/projects" element={<Projects />} />
        </Route>
        <Route path="*" element={<>404</>} />
      </Routes>
    </>
  );
};

export default AppRoutes;
