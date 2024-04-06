import Login from "./components/login/login";
import NavBar from "./components/navigation/nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/signup/signup";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Users from "./components/manage-users/users";
import { useEffect, useState } from "react";
import _ from "lodash";

interface AuthSession {
  isAuthenticated: boolean;
  token: string;
}

function App() {
  const [auth, setAuth] = useState<AuthSession | null>();
  useEffect(() => {
    let session = sessionStorage.getItem("auth");
    if (session) {
      setAuth(JSON.parse(session));
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        {auth && !_.isEmpty(auth) && auth.isAuthenticated && <NavBar />}
        <Routes>
          <Route path="/" element={<>Hello Home</>} />
          <Route path="/news" element={<>News</>} />
          <Route path="/about" element={<>About</>} />
          <Route path="/contact" element={<>Contact</>} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<>404</>} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
