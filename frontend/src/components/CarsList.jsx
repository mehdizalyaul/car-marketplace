import { useEffect, useState } from "react";
import useCars from "../hooks/useCars";
import Card from "./Card";
import LayoutSwitcher from "./switchLayout";
import SortMenu from "./SortMenu";
import TagsList from "./TagsList";
import { fallbackCars } from "../db";
import { Loader2, AlertCircle } from "lucide-react";
import "../styles/CarsList.css";
import { useAuth } from "../hooks/useAuth";

export default function CarsList() {
  const [layoutMode, setLayoutMode] = useState("grid"); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState("recommended");
  const { cars, loading, error, filters, loadCars, loadNextPage } = useCars();
  const { authReady, token } = useAuth();

  // Reload cars when filters change
  useEffect(() => {
    if (authReady) {
      loadCars(filters, 1);
    }
  }, [filters, authReady, token]);

  // Infinite scroll
  useEffect(() => {
    function handleScroll() {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 700;

      if (bottom && !loading) {
        console.log("Loading next page...");
        loadNextPage();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  // Fallback if no cars
  const carsList = cars?.length > 0 ? cars : fallbackCars;

  return (
    <div className="cars-list-wrapper">
      {/* Toolbar */}
      <div className="cars-toolbar">
        <div className="toolbar-left">
          <h2 className="results-count">
            {carsList?.length || 0}{" "}
            {carsList?.length === 1 ? "Vehicle" : "Vehicles"} Found
          </h2>
        </div>
        <div className="toolbar-right">
          <SortMenu value={sortBy} onChange={setSortBy} />
          <LayoutSwitcher current={layoutMode} onChange={setLayoutMode} />
        </div>
      </div>

      {/* Tags */}
      <TagsList />

      {/* Error State */}
      {error && (
        <div className="cars-error">
          <AlertCircle size={48} />
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
        </div>
      )}

      {/* Cars Grid/List */}
      <div className={`cars-container ${layoutMode}`}>
        {carsList &&
          carsList.map((car) => (
            <Card key={car.id} car={car} layoutMode={layoutMode} />
          ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="cars-loading">
          <Loader2 size={32} className="spinner" />
          <p>Loading more vehicles...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && carsList?.length === 0 && (
        <div className="cars-empty">
          <AlertCircle size={48} />
          <h3>No vehicles found</h3>
          <p>Try adjusting your filters to see more results</p>
        </div>
      )}
    </div>
  );
}
