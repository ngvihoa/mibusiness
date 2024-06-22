import { useDispatch } from "react-redux";
import { logOut } from "src/redux/features/auth-slice";
import { AppDispatch } from "src/redux/store";

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const handleLogIn = () => {};

  return {
    handleLogOut,
  };
};

export default useAuth;
