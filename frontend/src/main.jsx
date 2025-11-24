import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CarsProvider } from "./contexts/CarsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CarsProvider>
        <App />
      </CarsProvider>
    </BrowserRouter>
  </StrictMode>
);
