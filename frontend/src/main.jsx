import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CarsProvider } from "./contexts/CarsContext.jsx";
import { WishlistProvider } from "./contexts/WishlistContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CarsProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </CarsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
