import { useEffect, useState } from "react";
import useCars from "../hooks/useCars";
import Card from "./Card";
import LayoutSwitcher from "./LayoutSwitcher";
import SortMenu from "./SortMenu";
import TagsList from "./TagsList";
import { fallbackCars } from "../db";
import { Loader2, AlertCircle } from "lucide-react";
import "../styles/CarsList.css";
import { useAuth } from "../hooks/useAuth";

export default function CarsList() {
  const [layoutMode, setLayoutMode] = useState("grid"); // 'grid' | 'list'
  const [sortBy, setSortBy] = useState("recommended");

  const { cars, loading, error, loadCars, loadNextPage } = useCars();
  const { authReady } = useAuth();

  /* ---------------- Initial Load ---------------- */
  useEffect(() => {
    if (authReady) {
      loadCars();
    }
  }, [authReady]);

  /* ---------------- Infinite Scroll ---------------- */
  useEffect(() => {
    function handleScroll() {
      const reachedBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 700;

      if (reachedBottom && !loading) {
        loadNextPage();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  /* ---------------- Derived States ---------------- */
  const carsList = cars?.length > 0 ? cars : fallbackCars;

  const isInitialLoading = loading && cars.length === 0;
  const isLoadingMore = loading && cars.length > 0;

  const skeletonCount = layoutMode === "grid" ? 10 : 4;

  /* ---------------- Render ---------------- */
  return (
    <div className="cars-list-wrapper">
      {/* Toolbar */}
      <div className="cars-toolbar">
        <div className="toolbar-left">
          <h2 className="results-count">
            {carsList.length} {carsList.length === 1 ? "Vehicle" : "Vehicles"}{" "}
            Found
          </h2>
        </div>

        <div className="toolbar-right">
          <SortMenu value={sortBy} onChange={setSortBy} />
          <LayoutSwitcher current={layoutMode} onChange={setLayoutMode} />
        </div>
      </div>

      {/* Tags */}
      <TagsList />

      {/* Error */}
      {error && (
        <div className="cars-error">
          <AlertCircle size={48} />
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
        </div>
      )}

      {/* Cars */}
      <div className={`cars-container ${layoutMode}`}>
        {/* Initial Skeletons */}
        {isInitialLoading &&
          Array.from({ length: skeletonCount }).map((_, i) => (
            <SkeletonCard key={i} layoutMode={layoutMode} />
          ))}

        {/* Real Cards */}
        {!isInitialLoading &&
          carsList.map((car) => (
            <Card key={car.id} car={car} layoutMode={layoutMode} />
          ))}

        {/* Infinite Scroll Skeletons */}
        {isLoadingMore &&
          Array.from({ length: skeletonCount }).map((_, i) => (
            <SkeletonCard key={`load-${i}`} layoutMode={layoutMode} />
          ))}
      </div>

      {/* Empty */}
      {!loading && carsList.length === 0 && (
        <div className="cars-empty">
          <AlertCircle size={48} />
          <h3>No vehicles found</h3>
          <p>Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}

/* ---------------- Skeleton Card ---------------- */

function SkeletonCard({ layoutMode }) {
  return (
    <div
      className={layoutMode === "grid" ? "car-card-load" : "car-card-list-load"}
    >
      <div
        className={
          layoutMode === "grid" ? "card-image-load" : "card-list-image-load"
        }
      />
      <div
        className={
          layoutMode === "grid" ? "card-content-load" : "card-list-content-load"
        }
      >
        <div className="line-load short" />
        <div className="line-load" />
        <div className="line-load" />
      </div>
    </div>
  );
}
