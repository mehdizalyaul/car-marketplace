import "./App.css";
import "./styles/global.css";

import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Header from "./components/Header";
import Main from "./pages/Main";
import CarDetails from "./pages/CarDetails";
import Wishlist from "./pages/WishList";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { useAuth } from "./hooks/useAuth";

function App() {
  const { user, token } = useAuth();
  const isAuthenticated = !!user && !!token;

  return (
    <>
      <Header />
      <Routes>
        {/* Main page wrapped in Layout (sidebar) */}

        {isAuthenticated ? (
          <Route path="/cars/wishlist" element={<Wishlist />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}

        {/* Public routes */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" /> : <Register />}
        />

        <Route path="/cars" element={<Layout />}>
          <Route index element={<Main />} /> {/* default page */}
        </Route>

        {/* Pages without Layout */}

        <Route path="/cars/:id" element={<CarDetails />} />

        {/* Fallback */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/cars" : "/login"} />}
        />
      </Routes>
    </>
  );
}

export default App;
