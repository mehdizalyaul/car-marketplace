import { useReducer } from "react";
import { CarsApi } from "../services";
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
  page: 1,
  pageSize: 20,
  total: 0,
  hasMore: true,
};

function carsReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true };
    case "SET_DATA":
      return {
        ...state,
        cars: action.payload.cars,
        total: action.payload.total || 0,
        loading: false,
        hasMore: action.payload.hasMore,
      };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_FILTERS":
      return { ...state, filters: action.payload, page: 1, cars: [] };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "APPEND_CARS":
      return {
        ...state,
        cars: [...state.cars, ...action.payload.cars],
        hasMore:
          state.cars.length + action.payload.cars.length <
          (action.payload.total || 0),
      };
    default:
      return state;
  }
}

export function CarsProvider({ children }) {
  const [state, dispatch] = useReducer(carsReducer, initialState);

  // Load first page or reload after filters
  const loadCars = async (filters = state.filters, page = 1) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await CarsApi.getFiltered(filters, page, state.pageSize);
      if (page === 1) dispatch({ type: "SET_DATA", payload: res });
      else dispatch({ type: "APPEND_CARS", payload: res });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  };

  // Set filters and reload
  const setFilters = (newFilters) => {
    dispatch({ type: "SET_FILTERS", payload: newFilters });
    loadCars(newFilters, 1);
  };

  // Load next page for infinite scroll / "Load More"
  const loadNextPage = () => {
    if (!state.hasMore || state.loading) return;
    const nextPage = state.page + 1;
    dispatch({ type: "SET_PAGE", payload: nextPage });
    loadCars(state.filters, nextPage);
  };

  return (
    <CarsContext.Provider
      value={{
        ...state,
        dispatch,
        setFilters,
        loadCars,
        loadNextPage,
      }}
    >
      {children}
    </CarsContext.Provider>
  );
}
