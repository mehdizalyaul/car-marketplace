import { useReducer } from "react";
import { CarsApi } from "../services";
import { CarsContext } from "./myContexts";

const initialState = {
  cars: [],
  filters: {},
  filterOptions: {
    brands: [],
    fuels: [],
    transmissions: [],
    locations: [],
    prices: [],
    mileages: [],
    conditions: [],
    statuses: [],
  },
  loading: false,
  error: null,
  currentPage: 1,
  lastPage: 1,
  total: 0,
  pageSize: 5,
};

function carsReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true };

    case "SET_DATA":
      // For first page or filter change - replace all cars
      return {
        ...state,
        cars: action.payload.cars,
        total: action.payload.total,
        currentPage: action.payload.currentPage,
        lastPage: action.payload.lastPage,
        filterOptions: action.payload.filterOptions || state.filterOptions,
        loading: false,
        error: null,
      };

    case "APPEND_CARS":
      // For subsequent pages - append cars
      return {
        ...state,
        cars: [
          ...state.cars,
          ...action.payload.cars.filter(
            (newCar) => !state.cars.some((car) => car.id === newCar.id)
          ),
        ],
        total: action.payload.total,
        currentPage: action.payload.currentPage,
        lastPage: action.payload.lastPage,
        loading: false,
        error: null,
      };

    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };

    case "SET_FILTERS":
      return { ...state, filters: action.payload, currentPage: 1, cars: [] };

    default:
      return state;
  }
}

export function CarsProvider({ children }) {
  const [state, dispatch] = useReducer(carsReducer, initialState);

  // Load cars for specific page
  const loadCars = async (filters = state.filters, page = 1) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await CarsApi.getFiltered(filters, page, state.pageSize);
      console.log("API Response:", res);

      if (!res) {
        dispatch({ type: "SET_ERROR", payload: "No data received" });
        return;
      }

      // Extract data from API response
      const cars = res.cars || [];
      const pagination = res.pagination || {};
      const filterOptions = res.filters || null;
      console.log(filterOptions);
      const total = pagination.total || 0;
      const currentPage = pagination.current_page || page;
      const lastPage = pagination.last_page || 1;

      const payload = {
        cars,
        total,
        currentPage,
        lastPage,
        filterOptions: filterOptions
          ? {
              brands: filterOptions.brands || [],
              fuels: filterOptions.fuels || [],
              transmissions: filterOptions.transmissions || [],
              locations: filterOptions.locations || [],
              prices: filterOptions.price || [],
              mileages: filterOptions.mileage || [],
              conditions: filterOptions.conditions || [],
              statuses: filterOptions.statuses || [],
            }
          : null,
      };

      if (page === 1) {
        dispatch({ type: "SET_DATA", payload });
      } else {
        dispatch({ type: "APPEND_CARS", payload });
      }
    } catch (err) {
      console.error("Load cars error:", err);
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  };

  // Set filters and reload from page 1
  const setFilters = (newFilters) => {
    dispatch({ type: "SET_FILTERS", payload: newFilters });
    loadCars(newFilters, 1);
  };

  // Load next page for infinite scroll
  const loadNextPage = () => {
    if (state.currentPage >= state.lastPage || state.loading) return;
    const nextPage = state.currentPage + 1;
    loadCars(state.filters, nextPage);
  };

  // Load specific page (for pagination buttons)
  const loadPage = (page) => {
    if (page < 1 || page > state.lastPage || state.loading) return;
    loadCars(state.filters, page);
  };

  return (
    <CarsContext.Provider
      value={{
        ...state,
        dispatch,
        setFilters,
        loadCars,
        loadNextPage,
        loadPage,
      }}
    >
      {children}
    </CarsContext.Provider>
  );
}
