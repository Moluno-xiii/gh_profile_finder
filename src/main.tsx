import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ProfileContextProvider from "./context/ProfileContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProfileContextProvider>
      <App />
    </ProfileContextProvider>
  </StrictMode>
);
