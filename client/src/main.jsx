import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthProvider } from "./context/Auth.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { SearchProvider } from "./context/Search.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SearchProvider>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </SearchProvider>
);
