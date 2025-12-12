import { useState } from "react";
import { AuthApi } from "../services";
import { AuthContext } from "./myContexts";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [authReady, setAuthReady] = useState(token !== null);

  // ------------- Register ----------------
  const register = async (data) => {
    try {
      const result = await AuthApi.register(data);
      if (!result?.token || !result?.user)
        throw new Error(result?.message || "Registration failed");

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      setToken(result.token);
      setUser(result.user);
    } catch (error) {
      console.log("Registration error:", error);
      throw error; // re-throw for caller
    } finally {
      setAuthReady(true);
    }
  };

  // ------------- Login ----------------
  const login = async (data) => {
    try {
      const result = await AuthApi.login(data);

      if (!result?.token || !result?.user) {
        throw new Error("Login failed");
      }

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      setToken(result.token);
      setUser(result.user);
    } catch (error) {
      console.log("Login error:", error);
    } finally {
      setAuthReady(true);
    }
  };

  // ------------- Logout ----------------
  const logout = async () => {
    try {
      await AuthApi.logout(token);
    } catch (e) {
      console.log("Logout error:", e);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        authReady,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
