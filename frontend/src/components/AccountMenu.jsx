import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { User, Heart, Settings, LogOut, Car, Bell } from "lucide-react";
import "../styles/AccountMenu.css";

export default function AccountMenu() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout();
      navigate("/login");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  const menuItems = [
    {
      icon: <User size={18} />,
      label: "Profile",
      onClick: () => navigate("/profile"),
    },
    {
      icon: <Heart size={18} />,
      label: "Wishlist",
      onClick: () => navigate("/cars/wishlist"),
    },
    {
      icon: <Car size={18} />,
      label: "Activity",
      onClick: () => navigate("/activity"),
    },
    {
      icon: <Bell size={18} />,
      label: "Notifications",
      onClick: () => navigate("/profile?section=notifications"),
    },
    {
      icon: <Settings size={18} />,
      label: "Settings",
      onClick: () => navigate("/profile?section=settings"),
    },
  ];

  return (
    <div className="account-menu">
      {/* User Info Section */}
      <div className="account-menu-header">
        <div className="account-avatar">
          {user?.avatar ? (
            <img src={user.avatar} alt={user?.name} />
          ) : (
            <div className="account-avatar-placeholder">
              <User size={20} />
            </div>
          )}
        </div>
        <div className="account-info">
          <p className="account-name">{user?.name || "John Doe"}</p>
          <p className="account-email">{user?.email || "john@example.com"}</p>
        </div>
      </div>

      <div className="account-menu-divider"></div>

      {/* Menu Items */}
      <ul className="account-list">
        {menuItems.map((item, index) => (
          <li key={index} className="account-item" onClick={item.onClick}>
            <span className="account-icon">{item.icon}</span>
            <span className="account-label">{item.label}</span>
          </li>
        ))}
      </ul>

      <div className="account-menu-divider"></div>

      {/* Logout */}
      <div className="account-logout">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
