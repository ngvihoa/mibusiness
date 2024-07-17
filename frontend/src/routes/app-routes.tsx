import { Navigate, Route, Routes } from "react-router-dom";
import Users from "pages/users/users";
import Login from "pages/auth/login";
import Signup from "pages/auth/signup";
import PrivateRoutes from "routes/private-routes";
import PreventAuthRoutes from "routes/prevent-auth-routes";
import Roles from "pages/roles/roles";
import RolesDisplay from "pages/roles/roles-display";
import RolesAdding from "pages/roles/roles-adding";
import RolesAssign from "pages/roles/roles-assign";
import Home from "pages/home/home";
import UserList from "pages/users/user-list";
import UserGroup from "pages/users/user-group";
import GroupsAdding from "pages/users/groups-adding";
import Projects from "pages/projects/projects";

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
