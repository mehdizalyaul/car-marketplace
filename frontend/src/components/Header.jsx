import {  Heart, ShoppingCart, User, Search, Car, Medal } from "lucide-react";
import '../styles/Header.css';
import {  useState } from "react";

export default function Header() {
  const [element,setElement]=useState("new");


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
    {["new", "used", "electrical", "other"].map((item) => (
      <li
        key={item}
        className="car-lower-item"
        onMouseEnter={(e) => {
          const rect = e.target.getBoundingClientRect();

          const list = document.querySelector(".car-lower-list");
          list.style.setProperty("--underline-x", e.target.offsetLeft + "px");
          list.style.setProperty("--underline-width", rect.width + "px");

          setElement(item);
        }}
      >
        {item.charAt(0).toUpperCase() + item.slice(1)}
      </li>
    ))}
  </ul>

  {element && (
    <div className="vercel-menu" onMouseLeave={() =>{
      setElement("")
    } }>
      <div className="vercel-menu-section">
        <h4>{element.toUpperCase()}</h4>
        <p>Explore top vehicles in the {element} category.</p>
      </div>

      <div className="vercel-menu-grid">
        {[
          { title: "Best Offers", desc: `This is the offers for ${element}` },
          { title: "Top Rated", desc: `This is the top rated ${element} cars` },
          { title: "New Arrivals", desc: `This is the new arrivals ${element} cars` },
          { title: "Trending Models", desc: `This is the trending ${element} cars` },
        ].map((item, i) => (
          <div key={i} className="vercel-menu-item">
            <div className="menu-item-icon"><Medal /></div>
            <div className="menu-item-description">
              <p className="menu-title">{item.title}</p>
              <span>{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
</nav>
  
    </>
  );
}
