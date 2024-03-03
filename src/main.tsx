import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ContextProvider } from "./context/Context.tsx";
import { BrowserRouter, HashRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <ContextProvider>
      <App />
    </ContextProvider>{" "}
  </HashRouter>
);
