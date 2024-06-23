import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleError } from "src/lib/func";
import { LoginType } from "src/lib/type";
import { logIn, logOut } from "src/redux/features/auth-slice";
import { AppDispatch } from "src/redux/store";
import { logOutUser } from "src/services/userService";

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const data = await logOutUser();
      if (+data.EC === 0) {
        dispatch(logOut());
        navigate("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.status || 500);
      }
    }
  };

  const handleLogIn = (authState: LoginType) => {
    dispatch(logIn(authState));
    toast.success("Login success!");
    navigate("/users");
  };

  const handleToSignup = () => {
    navigate("/signup");
  };

  const handleToLogin = () => {
    navigate("/login");
  };

  return {
    handleLogOut,
    handleLogIn,
    handleToSignup,
    handleToLogin,
  };
};

export default useAuth;
