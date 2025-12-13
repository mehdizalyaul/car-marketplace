import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import "../styles/SortMenu.css";

export default function SortMenu({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const options = [
    { id: "recommended", label: "Recommended" },
    { id: "price_low", label: "Price: Low to High" },
    { id: "price_high", label: "Price: High to Low" },
    { id: "mileage_low", label: "Mileage: Low to High" },
    { id: "mileage_high", label: "Mileage: High to Low" },
    { id: "year_new", label: "Newest Year" },
    { id: "year_old", label: "Oldest Year" },
  ];

  const activeLabel = options.find((o) => o.id === value)?.label;

  return (
    <div className="sort-wrapper">
      <button className="sort-btn" onClick={() => setOpen(!open)}>
        <span className="sort-text">Sort by:</span>
        <span className="sort-label">{activeLabel}</span>
        <ChevronDown
          size={16}
          className={`sort-chevron ${open ? "rotate" : ""}`}
        />
      </button>

      {open && (
        <>
          <div className="sort-overlay" onClick={() => setOpen(false)} />
          <div className="sort-menu">
            {options.map((opt) => (
              <div
                key={opt.id}
                className={`sort-item ${value === opt.id ? "active" : ""}`}
                onClick={() => {
                  onChange(opt.id);
                  setOpen(false);
                }}
              >
                <span>{opt.label}</span>
                {value === opt.id && <Check size={16} className="checked" />}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
