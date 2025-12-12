import {
  Heart,
  MapPin,
  Fuel,
  Settings,
  Gauge,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import "../styles/Card.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useWishlist from "../hooks/useWishlist";

export default function Card({ car, layoutMode = "grid", loadMode = false }) {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist } = useWishlist();
  // Use backend value directly
  const [isWishlisted, setIsWishlisted] = useState(!!car.is_wishlisted);

  if (loadMode) {
    return <div className="car-card-load"></div>;
  }

  const imageUrl = `http://localhost:8000/${car.image}`;

  const handleClickFavorite = (e) => {
    e.stopPropagation();

    if (isWishlisted) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car.id);
    }

    setIsWishlisted(!isWishlisted);
  };

  // List layout
  if (layoutMode === "list") {
    return (
      <div
        className="car-card-list"
        onClick={() => navigate(`/cars/${car.id}`)}
      >
        <div className="card-list-image-wrapper">
          <img className="card-list-image" src={imageUrl} alt={car.title} />
          <button
            className={`card-wishlist-btn ${isWishlisted ? "active" : ""}`}
            onClick={handleClickFavorite}
          >
            <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="card-list-content">
          <h3 className="card-list-title">{car.title}</h3>
          <p className="card-list-description">{car.description}</p>
          <div className="card-list-specs">
            <div className="card-list-spec">
              <Fuel size={16} />
              <span>{car.fuel}</span>
            </div>
            <div className="card-list-spec">
              <Settings size={16} />
              <span>{car.transmission}</span>
            </div>
            <div className="card-list-spec">
              <Gauge size={16} />
              <span>{(car.miles / 1000).toFixed(0)}k km</span>
            </div>
          </div>
          <div className="card-list-location">
            <MapPin size={14} />
            <span>{car.location}</span>
          </div>
        </div>
        <div className="card-list-price-section">
          <span className="card-list-price-label">LIST PRICE</span>
          <h3 className="card-list-price">${car.price?.toLocaleString()}</h3>
          <div className="card-list-price-badge">
            <CheckCircle size={14} />
            <span>Excellent price</span>
          </div>
          <button className="card-list-view-btn">
            View Details <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  // Grid layout
  return (
    <div className="car-card" onClick={() => navigate(`/cars/${car.id}`)}>
      <div className="card-image-wrapper">
        <img className="card-image" src={imageUrl} alt={car.title} />
        <button
          className={`card-wishlist-btn ${isWishlisted ? "active" : ""}`}
          onClick={handleClickFavorite}
        >
          <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="card-content">
        <h3 className="card-title">{car.title}</h3>
        <p className="card-description">{car.description}</p>
        <div className="card-specs">
          <div className="card-spec-item">
            <Fuel size={14} />
            <span>{car.fuel}</span>
          </div>
          <div className="card-spec-item">
            <Settings size={14} />
            <span>{car.transmission}</span>
          </div>
          <div className="card-spec-item">
            <Gauge size={14} />
            <span>{(car.miles / 1000).toFixed(0)}k km</span>
          </div>
        </div>
        <div className="card-footer">
          <span className="card-price-label">LIST PRICE</span>
          <h3 className="card-price">${car.price?.toLocaleString()}</h3>
          <div className="card-price-badge">
            <CheckCircle size={12} />
            <span>Excellent price</span>
          </div>
          <div className="card-location">
            <MapPin size={14} />
            <span>{car.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
