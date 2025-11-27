import { useState } from "react";
import {
  ChartNoAxesGantt,
  ChevronDown,
  ChevronRight,
  Fuel,
  Gem,
  MapPin,
  Ruler,
  Tag,
} from "lucide-react";
import useCars from "../hooks/useCars";
import "../styles/Sidebar.css";

export default function Sidebar() {
  const { filters, filterOptions, setFilters } = useCars();
  // --- Open/Collapse States ---
  const [openBrand, setOpenBrand] = useState(true);
  const [openFuel, setOpenFuel] = useState(true);
  const [openTransmission, setOpenTransmission] = useState(true);
  const [openMiles, setOpenMiles] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);
  const [openLocation, setOpenLocation] = useState(true);

  const [brandTab, setBrandTab] = useState("popular");

  // --- Filter States (strings only, never objects) ---
  const [brands, setBrandFilter] = useState(filters?.brand || []);
  const [fuels, setFuelFilter] = useState(filters?.fuel || []);
  const [transmissions, setTransmissionFilter] = useState(
    filters?.transmission || []
  );
  const [miles, setMilesFilter] = useState(filters?.mileage || []);
  const [prices, setPriceFilter] = useState(filters?.price || []);
  const [locations, setLocationFilter] = useState(filters?.location || []);

  // --- APPLY FILTERS ---
  function applyFilters() {
    const newFilters = {};

    if (brands.length) newFilters.brand = brands;
    if (fuels.length) newFilters.fuel = fuels;
    if (transmissions.length) newFilters.transmission = transmissions;
    if (miles.length) newFilters.mileage = miles;
    if (prices.length) newFilters.price = prices;
    if (locations.length) newFilters.location = locations;

    setFilters(newFilters);
  }

  // --- CLEAR FILTERS ---
  function clearFilters() {
    setBrandFilter([]);
    setFuelFilter([]);
    setTransmissionFilter([]);
    setMilesFilter([]);
    setPriceFilter([]);
    setLocationFilter([]);
    setFilters({});
  }

  // Get brands based on tab (you'll need to define popular brands)
  const popularBrands = ["Chevrolet", "Dodge", "Ford", "Honda", "Hyundai"];
  const displayedBrands =
    brandTab === "popular"
      ? filterOptions?.brands?.filter((b) => popularBrands.includes(b))
      : filterOptions?.brands;

  return (
    <aside className="filter-sidebar">
      <div className="filter-actions">
        <button className="apply" onClick={applyFilters}>
          Apply Filter
        </button>
        <button className="clear" onClick={clearFilters}>
          Clear All
        </button>
      </div>

      {/* BRAND */}
      <FilterSection
        title="Brand"
        open={openBrand}
        setOpen={setOpenBrand}
        icon={<Gem size={17} />}
      >
        <div className="tabs">
          <button
            className={brandTab === "popular" ? "tab active" : "tab"}
            onClick={() => setBrandTab("popular")}
          >
            Popular
          </button>
          <button
            className={brandTab === "all" ? "tab active" : "tab"}
            onClick={() => setBrandTab("all")}
          >
            All
          </button>
        </div>

        <div className="brand-list">
          {displayedBrands &&
            displayedBrands.map((b) => (
              <label className="brand-item" key={b}>
                <input
                  type="checkbox"
                  value={b}
                  checked={brands.includes(b)}
                  onChange={(e) => {
                    const value = e.target.value;
                    setBrandFilter((prev) =>
                      prev.includes(value)
                        ? prev.filter((item) => item !== value)
                        : [...prev, value]
                    );
                  }}
                />
                <span>{b}</span>
              </label>
            ))}
        </div>
      </FilterSection>

      {/* FUEL */}
      <FilterSection
        title="Fuel"
        open={openFuel}
        setOpen={setOpenFuel}
        icon={<Fuel size={17} />}
      >
        {filterOptions?.fuels &&
          filterOptions.fuels.map((f) => (
            <FilterOption
              key={f}
              label={f}
              selected={fuels}
              setSelected={setFuelFilter}
            />
          ))}
      </FilterSection>

      {/* TRANSMISSION */}
      <FilterSection
        title="Transmission"
        open={openTransmission}
        setOpen={setOpenTransmission}
        icon={<ChartNoAxesGantt size={17} />}
      >
        {filterOptions?.transmissions &&
          filterOptions.transmissions.map((t) => (
            <FilterOption
              key={t}
              label={t}
              selected={transmissions}
              setSelected={setTransmissionFilter}
            />
          ))}
      </FilterSection>

      {/* MILEAGE */}
      <FilterSection
        title="Mileage"
        open={openMiles}
        setOpen={setOpenMiles}
        icon={<Ruler size={17} />}
      >
        {filterOptions?.mileages &&
          filterOptions.mileages.map((m) => (
            <FilterOption
              key={m}
              label={m}
              selected={miles}
              setSelected={setMilesFilter}
            />
          ))}
      </FilterSection>

      {/* PRICE */}
      <FilterSection
        title="Price"
        open={openPrice}
        setOpen={setOpenPrice}
        icon={<Tag size={17} />}
      >
        {filterOptions?.prices &&
          filterOptions.prices.map((p) => (
            <FilterOption
              key={p}
              label={p}
              selected={prices}
              setSelected={setPriceFilter}
            />
          ))}
      </FilterSection>

      {/* LOCATION */}
      <FilterSection
        title="Location"
        open={openLocation}
        setOpen={setOpenLocation}
        icon={<MapPin size={17} />}
      >
        {filterOptions?.locations &&
          filterOptions.locations.map((l) => (
            <FilterOption
              key={l}
              label={l}
              selected={locations}
              setSelected={setLocationFilter}
            />
          ))}
      </FilterSection>
    </aside>
  );
}

/* ------------------- HELPER COMPONENTS ------------------- */

function FilterSection({ title, open, setOpen, icon, children }) {
  return (
    <div className="filter-section">
      <div className="filter-header" onClick={() => setOpen(!open)}>
        <div className="filter-header_title">
          {icon}
          <span>{title}</span>
        </div>
        <span className="arrow">
          {open ? <ChevronDown /> : <ChevronRight />}
        </span>
      </div>
      {open && <div className="filter-content">{children}</div>}
    </div>
  );
}

function FilterOption({ label, selected = [], setSelected }) {
  const isChecked = selected.includes(label);
  return (
    <label className="filter-option">
      <input
        type="checkbox"
        value={label}
        checked={isChecked}
        onChange={(e) => {
          const value = e.target.value;
          setSelected((prev) =>
            prev.includes(value)
              ? prev.filter((item) => item !== value)
              : [...prev, value]
          );
        }}
      />
      <span>{label}</span>
    </label>
  );
}
