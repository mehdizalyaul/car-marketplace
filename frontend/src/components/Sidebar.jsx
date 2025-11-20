import { useState } from "react";
import { ChartNoAxesGantt, ChevronDown, ChevronRight, Fuel, Gem, MapPin, Ruler, Tag } from "lucide-react";
import "../styles/Sidebar.css";

export default function Sidebar() {
  const [openBuyOnline, setOpenBuyOnline] = useState(true);
  const [openPopularFilters, setOpenPopularFilters] = useState(true);
  const [openBrand, setOpenBrand] = useState(true);
  const [openFuel, setOpenFuel] = useState(true);
  const [openTransmission, setOpenTransmission] = useState(true);
  const [openMiles, setOpenMiles] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);
  const [openLocation, setOpenLocation] = useState(true);
  const [brandTab, setBrandTab] = useState("popular");

  const brandList = [
    { name: "Chevrolet", count: "73,049" },
    { name: "Dodge", count: "15,066" },
    { name: "Ford", count: "78,737" },
    { name: "Honda", count: "50,158" },
    { name: "Hyundai", count: "35,781" },
  ];

  return (
    <aside className="filter-sidebar">

      {/* Buy Online */}
      <FilterSection
        title="Buy 100% online"
        open={openBuyOnline}
        setOpen={setOpenBuyOnline}
      />

      {/* Popular Filters */}
      <FilterSection
        title="Popular filters"
        open={openPopularFilters}
        setOpen={setOpenPopularFilters}
      >
        <FilterOption label="Under $25,000" />
        <FilterOption label="Under 30,000 miles" />
        <FilterOption label="One owner & accident-free" />
        <FilterOption label="Tech-savvy" />
        <FilterOption label="Smart & safe" />
        <FilterOption label="Eco-friendly & efficient" />
        <FilterOption label="All-terrain ready" />
      </FilterSection>

      {/* Brand */}
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
          {brandList.map(b => (
            <label className="brand-item" key={b.name}>
              <input type="checkbox" />
              <span>{b.name} ({b.count})</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Fuel */}
      <FilterSection
        title="Fuel"
        open={openFuel}
        setOpen={setOpenFuel}
        icon={<Fuel size={17} />}
      >
        <FilterOption label="Petrol" />
        <FilterOption label="Diesel" />
        <FilterOption label="Electric" />
        <FilterOption label="Hybrid" />
      </FilterSection>

      {/* Transmission */}
      <FilterSection
        title="Transmission"
        open={openTransmission}
        setOpen={setOpenTransmission}
        icon={<ChartNoAxesGantt size={17}/>}
      >
        <FilterOption label="Automatic" />
        <FilterOption label="Manual" />
        <FilterOption label="CVT" />
      </FilterSection>

      {/* Miles */}
      <FilterSection
        title="Mileage"
        open={openMiles}
        setOpen={setOpenMiles}
        icon={<Ruler size={17}/>}
      >
        <FilterOption label="Under 15,000 miles" />
        <FilterOption label="Under 30,000 miles" />
        <FilterOption label="Under 50,000 miles" />
      </FilterSection>

      {/* Price */}
      <FilterSection
        title="Price"
        open={openPrice}
        setOpen={setOpenPrice}
        icon={<Tag size={17} />}
      >
        <FilterOption label="Under $20,000" />
        <FilterOption label="Under $25,000" />
        <FilterOption label="Under $30,000" />
      </FilterSection>

      {/* Location */}
      <FilterSection
        title="Location"
        open={openLocation}
        setOpen={setOpenLocation}
        icon={<MapPin size={17} />}
      >
        <FilterOption label="Tampa, FL" />
        <FilterOption label="Orlando, FL" />
        <FilterOption label="Miami, FL" />
      </FilterSection>

    </aside>
  );
}

/* Helper Components */
function FilterSection({ title, open, setOpen,icon, children }) {
  return (
    <div className="filter-section">
      <div className="filter-header" onClick={() => setOpen(!open)}>
        <div className="filter-header_title">
         {icon && icon}
        <span>{title}</span>
        </div>
        
        <span className="arrow">{open ? <ChevronDown /> : <ChevronRight />}</span>
      </div>
      {open && <div className="filter-content">{children}</div>}
    </div>
  );
}

function FilterOption({ label }) {
  return (
    <label className="filter-option">
      <input type="checkbox" />
      {label}
    </label>
  );
}
