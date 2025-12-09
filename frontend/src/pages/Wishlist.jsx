import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  X,
  Calendar,
  Clock,
  MapPin,
  Fuel,
  Settings,
  AlertCircle,
  Car,
  ShoppingCart,
  Eye,
} from "lucide-react";
import "../styles/Wishlist.css";
import useWishlist from "../hooks/useWishlist";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { wishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const cars = wishlist.data?.map((list) => list.car);
    // Simulate loading delay
    setTimeout(() => {
      setWishlistItems(cars || []);
      setLoading(false);
    }, 800);
  }, [wishlist]);

  const clearWishlist = () => {
    if (
      window.confirm("Are you sure you want to clear your entire wishlist?")
    ) {
      localStorage.removeItem("wishlist");
      setWishlistItems([]);
    }
  };

  if (loading) {
    return (
      <div className="wishlist-loading">
        <Car size={48} className="loading-icon" />
        <p>Loading your wishlist...</p>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <div className="wishlist-title-section">
          <Heart size={32} className="wishlist-heart-icon" />
          <div>
            <h1 className="wishlist-title">My Wishlist</h1>
            <p className="wishlist-subtitle">
              {wishlistItems.length === 0
                ? "Your wishlist is empty"
                : `${wishlistItems.length} ${
                    wishlistItems.length === 1 ? "vehicle" : "vehicles"
                  } saved`}
            </p>
          </div>
        </div>

        {wishlistItems.length > 0 && (
          <button className="clear-wishlist-btn" onClick={clearWishlist}>
            <X size={18} /> Clear All
          </button>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <div className="empty-wishlist">
          <div className="empty-wishlist-icon">
            <Heart size={64} />
          </div>
          <h2 className="empty-wishlist-title">Your Wishlist is Empty</h2>
          <p className="empty-wishlist-text">
            Start adding vehicles you love to keep track of them!
          </p>
          <Link to="/" className="browse-cars-btn">
            <Car size={18} /> Browse Cars
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems &&
            wishlistItems.map((car) => (
              <div key={car.id} className="wishlist-card">
                <div className="wishlist-card-image-wrapper">
                  <img
                    src={`http://localhost:8000/${
                      car.images?.[0] || car.image
                    }`}
                    alt={car.title}
                    className="wishlist-card-image"
                  />
                  <button
                    className="remove-wishlist-btn"
                    onClick={() => removeFromWishlist(car.id)}
                    title="Remove from wishlist"
                  >
                    <X size={18} />
                  </button>
                  <span className={`wishlist-status-badge ${car.status}`}>
                    {car.status === "available" ? "Available" : "Sold"}
                  </span>
                </div>

                <div className="wishlist-card-content">
                  <h3 className="wishlist-card-title">{car.title}</h3>

                  <div className="wishlist-card-stats">
                    <span className="wishlist-stat">
                      <Calendar size={14} /> {car.year}
                    </span>
                    <span className="wishlist-stat">
                      <Clock size={14} /> {car.miles?.toLocaleString()} mi
                    </span>
                    <span className="wishlist-stat">
                      <Fuel size={14} /> {car.fuel || "Gasoline"}
                    </span>
                  </div>

                  <div className="wishlist-card-details">
                    <div className="wishlist-detail-item">
                      <Settings size={16} />
                      <span>{car.transmission}</span>
                    </div>
                    <div className="wishlist-detail-item">
                      <MapPin size={16} />
                      <span>{car.location}</span>
                    </div>
                  </div>

                  {car.description && (
                    <p className="wishlist-card-description">
                      {car.description.length > 80
                        ? `${car.description.substring(0, 80)}...`
                        : car.description}
                    </p>
                  )}

                  <div className="wishlist-card-footer">
                    <div className="wishlist-price-section">
                      <span className="wishlist-price">
                        ${car.price?.toLocaleString()}
                      </span>
                      <span className="wishlist-condition-badge">
                        {car.condition}
                      </span>
                    </div>

                    <div className="wishlist-card-actions">
                      <Link
                        to={`/cars/${car.id}`}
                        className="wishlist-view-btn"
                        title="View details"
                      >
                        <Eye size={18} />
                      </Link>
                      <button
                        className="wishlist-contact-btn"
                        title="Contact seller"
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {wishlistItems.length > 0 && (
        <div className="wishlist-summary">
          <div className="summary-card">
            <AlertCircle size={20} className="summary-icon" />
            <div className="summary-content">
              <h3 className="summary-title">Keep Track of Your Favorites</h3>
              <p className="summary-text">
                Your wishlist is saved locally. Contact dealers directly to
                schedule test drives or get more information about these
                vehicles.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
