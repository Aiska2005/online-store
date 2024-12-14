import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import store from "./redux/store";
import "./Styles/index.css";


createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}>
      <App />
    </BrowserRouter>
  </Provider>
);

