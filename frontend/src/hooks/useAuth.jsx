import { useContext } from "react";
import { AuthContext } from "../contexts/myContexts";

export const useAuth = () => {
  return useContext(AuthContext);
};
