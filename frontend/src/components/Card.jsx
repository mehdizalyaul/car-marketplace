import {
  Heart,
  CheckCircle,
  MapPin,
  Fuel,
  Settings,
  Gauge,
} from "lucide-react";
import "../styles/Card.css";

export default function Card({ car }) {
  return (
    <div className="car-card">
      <div className="description">

        {/* TITLE + HEART */}
        <div className="desc-header">
          <div className="header-text">
            <h2 className="title">{car.title}</h2>
            <p className="trim">{car.trim}</p>
          </div>

            <Heart className="heart" size={20} />
        </div>

        {/* TAGS */}
        <div className="tags">
          <span><Fuel size={15} /> {car.fuel}</span>
          <span><Settings size={15} /> {car.transmission}</span>
          <span><Gauge size={15} /> {(car.miles / 1000).toFixed(2)}k Km</span>
        </div>

        {/* IMAGE */}
        <div className="img-box">
          <img className="product-img" src={car.img} alt={car.title} />
        </div>

        {/* FOOTER */}
        <div className="footer">
          <div className="price-section">
            <span className="label">LIST PRICE</span>
            <h3 className="price">{car.price}</h3>

            <div className="price-rating">
              <CheckCircle size={16} color="#00a651" />
              <span>Excellent price</span>
            </div>
          </div>

          <div className="card-footer">
            <div className="location">
              <MapPin size={16} />
              <span>{car.location}</span>
            </div>

            <span className="footer-details">View Details</span>
          </div>
        </div>

      </div>
    </div>
  );
}
