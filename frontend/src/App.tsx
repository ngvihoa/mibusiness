import { Suspense, lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/navigation/nav";
import Loading from "./components/loading/loading";
const AppRoutes = lazy(() => import("./routes/app-routes"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <div className="app-header">
            <NavBar />
          </div>
          <div className="app-container">
            <AppRoutes />
          </div>
        </Suspense>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
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
    </>
  );
}

export default App;
