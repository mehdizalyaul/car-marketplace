import { Grid2x2, Grid3x2, Grid3x3 } from "lucide-react";
import "../styles/LayoutSwitcher.css";

export default function LayoutSwitcher({ current, onChange }) {
  return (
    <div className="layout-switcher">
      <button
        className={current === 2 ? "active" : ""}
        onClick={() => onChange(2)}
      >
        <Grid2x2 />
      </button>

      <button
        className={current === 4 ? "active" : ""}
        onClick={() => onChange(4)}
      >
        <Grid3x2 />

      </button>

      <button
        className={current === 5 ? "active" : ""}
        onClick={() => onChange(5)}
      >
                <Grid3x3     />

      </button>
    </div>
  );
}
