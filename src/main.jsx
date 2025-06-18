import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "leaflet/dist/leaflet.css";
import App from "./App.jsx";
import 'aos/dist/aos.css';
import Aos from "aos";
import { store } from "./store/store.js";
import { Provider } from "react-redux";

Aos.init();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
