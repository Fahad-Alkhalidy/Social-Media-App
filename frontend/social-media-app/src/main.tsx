import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Styling/index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import App from "./components/Page Components/App.tsx";
import SocketContextProvider from "./context/SocketContext.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SocketContextProvider>
      <App />
    </SocketContextProvider>
  </StrictMode>
);
