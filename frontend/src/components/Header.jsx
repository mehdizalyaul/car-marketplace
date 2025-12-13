import { Heart, ShoppingCart, User, Search, Car } from "lucide-react";
import "../styles/Header.css";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AccountMenu from "./accountMenu";
import { useAuth } from "../hooks/useAuth";
import { useDebounce } from "../hooks/useDebounce";
import useCars from "../hooks/useCars";
import LowerHeader from "./LowerHeader";

export default function Header() {
  const [menuVisible, setMenuVisible] = useState(false);
  const { isAuthenticated } = useAuth();
  const { setSearch } = useCars();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debouncedSearchQuery && debouncedSearchQuery.trim() !== "") {
      setSearch(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery, setSearch]);

  return (
    <>
      {/* Main Header */}
      <header className="car-header">
        <div className="car-header-left">
          <h1 className="car-logo">
            <NavLink to="/cars">
              <Car size={40} color="#405ff2" />
            </NavLink>
          </h1>
          <div className="car-search-wrapper">
            <Search size={16} className="car-search-icon" />
            <input
              type="text"
              placeholder="Search for cars..."
              className="car-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="car-header-right">
          <div className="car-icon-group">
            <Heart size={20} className="car-icon" />
            <NavLink to={`${isAuthenticated ? "/cars/wishlist" : "/login"}`}>
              <span>Favorites</span>
            </NavLink>
          </div>
          <div className="car-icon-group">
            <ShoppingCart size={20} className="car-icon" />
            <span>Cart</span>
          </div>
          <div
            className="car-icon-group"
            onClick={() => setMenuVisible(!menuVisible)}
          >
            <User size={20} className="car-icon" />
            <span>Account</span>
          </div>
        </div>
      </header>
      {menuVisible && <AccountMenu />}

      {/* Lower Sticky Header */}
      <LowerHeader />
    </>
  );
}
