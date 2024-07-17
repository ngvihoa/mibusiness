import App from "./App";
import { persistStore } from "redux-persist";
import { store } from "./stores/store";
import { ReduxProvider } from "./stores/provider";
import { PersistGate } from "redux-persist/integration/react";

const AppContainer = () => {
  let persistor = persistStore(store);

  return (
    <ReduxProvider>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </ReduxProvider>
  );
};

export default AppContainer;
