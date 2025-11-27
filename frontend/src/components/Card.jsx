import {
  Heart,
  CheckCircle,
  MapPin,
  Fuel,
  Settings,
  Gauge,
} from "lucide-react";
import "../styles/Card.css";
import { useNavigate } from "react-router-dom";

export default function Card({ car, loadMode = false }) {
  const navigate = useNavigate();

  if (loadMode) {
    return <div className="car-card-load"></div>;
  }

  const imageUrl = `http://localhost:8000/${car.image}`;

  return (
    <div className="car-card" onClick={() => navigate(`/cars/${car.id}`)}>
      <div className="car-card-content">
        {/* TITLE + HEART */}
        <div className="card-desc-header">
          <div className="card-header-text">
            <h3 className="card-title">{car.title}</h3>
            <p className="card-description">{car.description}</p>
          </div>

          <Heart className="card-heart" size={20} />
        </div>

        {/* TAGS */}
        <div className="card-tags">
          <span>
            <Fuel size={15} /> {car.fuel}
          </span>
          <span>
            <Settings size={15} /> {car.transmission}
          </span>
          <span>
            <Gauge size={15} /> {(car.miles / 1000).toFixed(2)}k Km
          </span>
        </div>

        {/* IMAGE */}
        <div className="card-img-box">
          <img className="card-product-img" src={imageUrl} alt={car.title} />
        </div>

        {/* FOOTER */}
        <div className="card-footer-container">
          <div className="card-price-section">
            <span className="card-label">LIST PRICE</span>
            <h3 className="card-price">{car.price}$</h3>

            <div className="card-price-rating">
              <CheckCircle size={16} color="#00a651" />
              <span>Excellent price</span>
            </div>
          </div>

          <div className="card-footer">
            <div className="card-location">
              <MapPin size={16} />
              <span>{car.location}</span>
            </div>

            <span className="card-footer-details">View Details</span>
          </div>
        </div>
      </div>
    </div>
  );
}
