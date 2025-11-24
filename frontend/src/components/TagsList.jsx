import { X } from "lucide-react";
import useCars from "../hooks/useCars";
import "../styles/TagsList.css";

export default function TagsList() {
  const { filters, dispatch } = useCars();
  return (
    <div className="active-filters">
      {Object.keys(filters).map((key) => {
        const values = filters[key];

        if (!values || values.length === 0) return null;

        const title = values.join(", ");
        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);

        return (
          <span className="filter-tag" key={key} title={title}>
            <span className="tag-key">{capitalizedKey}:</span>

            <span className="tag-value">
              {values.length > 1 ? `${values.length} selected` : values[0]}
            </span>

            <X
              size={14}
              onClick={() =>
                dispatch({
                  type: "CLEAR_A_FILTER_GROUP",
                  payload: { type: key },
                })
              }
            />
          </span>
        );
      })}
    </div>
  );
}
