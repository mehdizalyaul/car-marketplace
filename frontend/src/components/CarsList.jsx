import { useEffect, useState } from "react";
import useCars from "../hooks/useCars";
import Card from "./Card";
import LayoutSwitcher from "./switchLayout";
import SortMenu from "./SortMenu";
import TagsList from "./TagsList";
import { fallbackCars } from "../db";

export default function CarsList() {
  const [cols, setCols] = useState(4);
  const [sortBy, setSortBy] = useState("recommended");

  const { cars, loading, error, filters, loadCars, loadNextPage } = useCars();

  // Reload cars when filters change
  useEffect(() => {
    loadCars(filters, 1);
  }, [filters]);

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

  const sizeMap = {
    2: 1,
    4: 1,
    5: 1,
  };

  return (
    <div>
      <div className="cars-toolbar">
        <SortMenu value={sortBy} onChange={setSortBy} />
        <LayoutSwitcher current={cols} onChange={setCols} />
      </div>

      <TagsList />

      {loading && <p>Loading cars...</p>}
      {error && <p>Error: {error}</p>}

      <div
        className="cars-container"
        style={{ "--cols": cols, "--scale": sizeMap[cols] }}
      >
        {carsList && carsList.map((car) => <Card key={car.id} car={car} />)}
      </div>
    </div>
  );
}
