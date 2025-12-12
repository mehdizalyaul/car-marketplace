import { useReducer } from "react";
import { CarsApi } from "../services";
import { CarsContext } from "./myContexts";
import { useAuth } from "../hooks/useAuth";

const savedFilters = (() => {
  try {
    return JSON.parse(localStorage.getItem("filters")) || {};
  } catch {
    return {};
  }
})();

const initialState = {
  cars: [],
  filters: savedFilters,
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

    case "CLEAR_A_FILTER_GROUP":
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.type]: [],
        },
        currentPage: 1,
        cars: [],
      };

    default:
      return state;
  }
}

export function CarsProvider({ children }) {
  const [state, dispatch] = useReducer(carsReducer, initialState);
  const { token, authReady } = useAuth();
  const loadCars = async (filters = state.filters, page = 1) => {
    dispatch({ type: "SET_LOADING" });
    try {
      if (!authReady) {
        return;
      }
      const res = await CarsApi.getFiltered(
        filters,
        page,
        state.pageSize,
        token
      );
      if (!res) {
        dispatch({ type: "SET_ERROR", payload: "No data received" });
        return;
      }

      const cars = res.cars || [];
      const pagination = res.pagination || {};
      const filterOptions = res.filters || null;

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

  const setFilters = (newFilters) => {
    dispatch({ type: "SET_FILTERS", payload: newFilters });
    localStorage.setItem("filters", JSON.stringify(newFilters));
    loadCars(newFilters, 1);
  };

  const clearFilterGroup = (type) => {
    const updated = { ...state.filters, [type]: [] };
    localStorage.setItem("filters", JSON.stringify(updated));
    dispatch({ type: "CLEAR_A_FILTER_GROUP", payload: { type } });
    loadCars(updated, 1);
  };

  const loadNextPage = () => {
    if (state.currentPage >= state.lastPage || state.loading) return;
    loadCars(state.filters, state.currentPage + 1);
  };

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
        clearFilterGroup,
        loadCars,
        loadNextPage,
        loadPage,
      }}
    >
      {children}
    </CarsContext.Provider>
  );
}
