import React from "react";
import "./App.css";
import MainRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import { store } from "./store";
import { calculateSubTotal } from "./slice/CartSlice";

function App() {
  store.dispatch(calculateSubTotal);

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <MainRoutes />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
