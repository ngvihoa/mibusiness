import Login from "./components/login/login";
import NavBar from "./components/navigation/nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/news" element={<>News</>} />
        <Route path="/about" element={<>About</>} />
        <Route path="/contact" element={<>Contact</>} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<>Hello Home</>} />
        <Route path="*" element={<>404</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
