import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Styling/index.css";
import App from "./components/Page Components/App.tsx";
import SocketContextProvider from "./context/SocketContext.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SocketContextProvider>
      <App />
    </SocketContextProvider>
  </StrictMode>
);
