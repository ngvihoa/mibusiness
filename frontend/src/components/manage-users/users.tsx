import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let session = sessionStorage.getItem("auth");
    if (!session) {
      navigate("/login");
    }
  }, [navigate]);
  return <div>users</div>;
};

export default Users;
