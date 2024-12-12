import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@paperclip-labs/whisk-sdk/styles.css";
import "./index.css";
import App from "./App.tsx";
import Providers from "./Providers.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);
