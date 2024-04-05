import Login from "./components/login/login";
import NavBar from "./components/navigation/nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/signup/signup";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavBar />
                Hello Home
              </>
            }
          />
          <Route
            path="/news"
            element={
              <>
                <NavBar />
                News
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <NavBar />
                About
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <NavBar />
                Contact
              </>
            }
          />
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
