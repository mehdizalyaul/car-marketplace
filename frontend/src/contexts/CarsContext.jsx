import { useReducer } from "react";
import { CarsApi } from "../services";
import { CarsContext } from "./myContexts";
import { useAuth } from "../hooks/useAuth";

/* ===================== LOCAL STORAGE ===================== */
const savedFilters = (() => {
  try {
    return JSON.parse(localStorage.getItem("filters")) || {};
  } catch {
    return {};
  }
})();

/* ===================== INITIAL STATE ===================== */
const initialState = {
  cars: [],
  filters: savedFilters,
  search: "",
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
  pageSize: 8,
};

/* ===================== REDUCER ===================== */
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

    case "SET_FILTERS":
      return {
        ...state,
        filters: action.payload,
        currentPage: 1,
        cars: [],
      };

    case "SET_SEARCH":
      return {
        ...state,
        search: action.payload,
        currentPage: 1,
        cars: [],
      };

    case "CLEAR_A_FILTER_GROUP":
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload]: [],
        },
        currentPage: 1,
        cars: [],
      };

    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
}

/* ===================== PROVIDER ===================== */
export function CarsProvider({ children }) {
  const [state, dispatch] = useReducer(carsReducer, initialState);
  const { token, authReady } = useAuth();

  /* ===================== LOAD CARS ===================== */
  const loadCars = async (
    filters = state.filters,
    search = state.search,
    page = 1
  ) => {
    if (!authReady) return;

    dispatch({ type: "SET_LOADING" });

    try {
      const res = await CarsApi.getCars({
        filters,
        search,
        page,
        pageSize: state.pageSize,
        token,
      });

      if (!res) {
        dispatch({ type: "SET_ERROR", payload: "No data received" });
        return;
      }

      const cars = res.cars || [];
      const pagination = res.pagination || {};
      const filterOptions = res.filters || null;

      const payload = {
        cars,
        total: pagination.total || 0,
        currentPage: pagination.current_page || page,
        lastPage: pagination.last_page || 1,
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

      dispatch({
        type: page === 1 ? "SET_DATA" : "APPEND_CARS",
        payload,
      });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  };

  /* ===================== FILTERS ===================== */
  const setFilters = (newFilters) => {
    localStorage.setItem("filters", JSON.stringify(newFilters));
    dispatch({ type: "SET_FILTERS", payload: newFilters });
    loadCars(newFilters, state.search, 1);
  };

  const clearFilterGroup = (type) => {
    const updated = { ...state.filters, [type]: [] };
    localStorage.setItem("filters", JSON.stringify(updated));
    dispatch({ type: "CLEAR_A_FILTER_GROUP", payload: type });
    loadCars(updated, state.search, 1);
  };

  /* ===================== SEARCH ===================== */
  const setSearch = (value) => {
    dispatch({ type: "SET_SEARCH", payload: value });
    loadCars(state.filters, value, 1);
  };

  /* ===================== PAGINATION ===================== */
  const loadNextPage = () => {
    if (state.loading || state.currentPage >= state.lastPage) return;
    loadCars(state.filters, state.search, state.currentPage + 1);
  };

  const loadPage = (page) => {
    if (page < 1 || page > state.lastPage || state.loading) return;
    loadCars(state.filters, state.search, page);
  };

  /* ===================== CONTEXT ===================== */
  return (
    <CarsContext.Provider
      value={{
        ...state,
        setFilters,
        clearFilterGroup,
        setSearch,
        loadCars,
        loadNextPage,
        loadPage,
      }}
    >
      {children}
    </CarsContext.Provider>
  );
}
