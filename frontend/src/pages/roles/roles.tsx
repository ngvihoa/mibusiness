import { Outlet } from "react-router-dom";

const Roles = () => {
  return (
    <div className="roles-container container-fluid container-md">
      <Outlet />
    </div>
  );
};

export default Roles;
