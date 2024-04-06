import NavBar from "./components/navigation/nav";
import { BrowserRouter } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/app-routes";
import { persistStore } from "redux-persist";
import { store } from "./redux/store";
import { ReduxProvider } from "./redux/provider";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  let persistor = persistStore(store);

  return (
    <>
      <ReduxProvider>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <div className="app-header">
              <NavBar />
            </div>
            <div className="app-container">
              <AppRoutes />
            </div>
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
          </BrowserRouter>
        </PersistGate>
      </ReduxProvider>
    </>
  );
}

export default App;
