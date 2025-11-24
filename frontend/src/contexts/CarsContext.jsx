import { useReducer } from "react";
import { CarApi } from "../services";
import { CarsContext } from "./myContexts";

const initialState = {
  cars: [],
  filters: {},
  filterOptions: {
    brand: ["Chevrolet", "Dodge", "Ford", "Honda", "Hyundai"],
    fuel: ["Petrol", "Diesel", "Electric", "Hybrid"],
    transmission: ["Automatic", "Manual", "CVT"],
    mileage: ["Under 15,000 miles", "Under 30,000 miles", "Under 50,000 miles"],
    price: ["Under $20,000", "Under $25,000", "Under $30,000"],
    location: ["Tampa, FL", "Orlando, FL", "Miami, FL"],
  },
  loading: false,
  error: null,
};

function carsReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true };

    case "SET_DATA":
      return { ...state, cars: action.payload, loading: false };

    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };

    case "SET_FILTER_OPTIONS":
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          ...action.payload,
        },
      };

    case "SET_FILTERS":
      return { ...state, filters: action.payload };

    case "CLEAR_A_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.type]: state.filters[action.payload.type].filter(
            (v) => v !== action.payload.value
          ),
        },
      };

    case "CLEAR_A_FILTER_GROUP":
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.type]: [],
        },
      };

    default:
      return state;
  }
}

export function CarsProvider({ children }) {
  const [state, dispatch] = useReducer(carsReducer, initialState);

  // Load all cars + filter options
  const getAllCars = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await CarApi.getAll();

      dispatch({ type: "SET_DATA", payload: res.cars });
      dispatch({ type: "SET_FILTER_OPTIONS", payload: res.filterOptions });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  };

  // Load cars after filtering
  const loadCars = async (filters) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await CarApi.getFiltered(filters);
      dispatch({ type: "SET_DATA", payload: res.cars });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  };

  // When user clicks on a filter option
  const setFilters = (newFilters) => {
    dispatch({ type: "SET_FILTERS", payload: newFilters });
    loadCars(newFilters);
  };

  return (
    <CarsContext.Provider
      value={{
        ...state,
        dispatch,
        getAllCars,
        loadCars,
        setFilters,
      }}
    >
      {children}
    </CarsContext.Provider>
  );
}
