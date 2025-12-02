import { createContext, useContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  // GET wishlist
  const fetchWishlist = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch wishlist");

      const data = await response.json();
      setWishlist(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ADD to wishlist
  const addToWishlist = async (carId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/wishlist/${carId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to add to wishlist");

      // update local state instead of refetching
      setWishlist((prev) => [...prev, { car_id: carId }]);
    } catch (err) {
      setError(err.message);
    }
  };

  // REMOVE from wishlist
  const removeFromWishlist = async (carId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/wishlist/${carId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to remove from wishlist");

      // update local state
      setWishlist((prev) => prev.filter((item) => item.car_id !== carId));
    } catch (err) {
      setError(err.message);
    }
  };

  // Helper function
  const isInWishlist = (carId) =>
    wishlist.some((item) => item.car_id === carId);

  // Fetch wishlist automatically on load
  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        error,
        fetchWishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
