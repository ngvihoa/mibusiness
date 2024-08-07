import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleError } from "lib/func";
import { LoginType } from "lib/interfaces/auth-store.interface";
import { logIn, logOut } from "stores/features/auth-slice";
import { AppDispatch } from "stores/store";
import { logOutUser } from "services/userService";

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const res = await logOutUser();
      if (res.message === "ok") {
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
