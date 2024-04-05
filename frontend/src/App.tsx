import Login from "./components/login/login";
import NavBar from "./components/navigation/nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/signup/signup";

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
      </BrowserRouter>
    </>
  );
}

export default App;
