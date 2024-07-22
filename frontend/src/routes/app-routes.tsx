import { Navigate, Route, Routes } from "react-router-dom";
import Users from "pages/users/users";
import Login from "pages/auth/login";
import Signup from "pages/auth/signup";
import PrivateRoutes from "routes/private-routes";
import PreventAuthRoutes from "routes/prevent-auth-routes";
import Roles from "pages/roles/roles";
import Home from "pages/home/home";
import UserList from "pages/users/user-list";
import UserGroup from "pages/users/user-group";
import GroupsAdding from "pages/users/groups-adding";
import Projects from "pages/projects/projects";
import ProjectAdding from "pages/projects/project-adding";
import ProjectList from "pages/projects/project-list";
import RoleList from "pages/roles/role-list";
import RoleAdding from "pages/roles/role-adding";
import RoleAssign from "pages/roles/role-assign";

const AppRoutes = () => {
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
            <Route path="group/adding" element={<GroupsAdding />} />
          </Route>
          <Route path="/roles" element={<Roles />}>
            <Route path="" element={<Navigate to="list" replace />} />
            <Route path="list" element={<RoleList />} />
            <Route path="adding" element={<RoleAdding />} />
            <Route path="assign" element={<RoleAssign />} />
          </Route>
          <Route path="/projects" element={<Projects />}>
            <Route path="" element={<Navigate to="list" replace />} />
            <Route path="list" element={<ProjectList />} />
            <Route path="adding" element={<ProjectAdding />} />
          </Route>
          <Route path="/about" element={<>About</>}></Route>
        </Route>
        <Route path="*" element={<>404</>} />
      </Routes>
    </>
  );
};

export default AppRoutes;
