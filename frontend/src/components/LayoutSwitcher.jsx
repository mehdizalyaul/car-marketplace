import { LayoutList, LayoutGrid } from "lucide-react";
import "../styles/LayoutSwitcher.css";

export default function LayoutSwitcher({ current, onChange }) {
  const layouts = [
    { mode: "grid", icon: LayoutGrid, label: "Grid view" },
    { mode: "list", icon: LayoutList, label: "List view" },
  ];

  return (
    <div className="layout-switcher">
      {layouts.map(({ mode, icon: Icon, label }) => (
        <button
          key={mode}
          className={`layout-btn ${current === mode ? "active" : ""}`}
          onClick={() => onChange(mode)}
          title={label}
        >
          <Icon size={18} />
        </button>
      ))}
    </div>
  );
}
