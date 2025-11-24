// src/hooks/useCars.js
import { useContext } from "react";
import { CarsContext } from "../contexts/myContexts";

export default function useCars() {
  return useContext(CarsContext);
}
