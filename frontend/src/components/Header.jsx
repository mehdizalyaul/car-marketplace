import {  Heart, ShoppingCart, User, Search, Car } from "lucide-react";
import '../styles/Header.css';

export default function Header() {
  return (
    <>
      {/* Main Header */}
      <header className="car-header">
        <div className="car-header-left">
          <h1 className="car-logo"><Car size={40} /></h1>
          <div className="car-search-wrapper">
            <Search size={16} className="car-search-icon" />
            <input
              type="text"
              placeholder="Search for furniture, decor, or essentials..."
              className="car-search-input"
            />
          </div>
        </div>

        <div className="car-header-right">
          
          <div className="car-icon-group">
            <Heart size={20} className="car-icon" />
            <span>Favorites</span>
          </div>
          <div className="car-icon-group">
            <ShoppingCart size={20} className="car-icon" />
            <span>Cart</span>
          </div>
          <div className="car-icon-group">
            <User size={20} className="car-icon" />
            <span>Account</span>
          </div>
        </div>
      </header>

      {/* Lower Sticky Header */}
      <nav className="car-lower-header">
        <ul className="car-lower-list">
          <li className="car-lower-item">New</li>
          <li className="car-lower-item">Used</li>
          <li className="car-lower-item">Electrical</li>
          <li className="car-lower-item">Other</li>
        </ul>
      </nav>
    </>
  );
}
