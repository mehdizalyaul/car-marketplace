import { useState, useEffect } from "react";
import { WishlistContext } from "../contexts/myContexts";
import { useAuth } from "../hooks/useAuth";
import { WishlistApi } from "../services";

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  // GET wishlist
  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const data = await WishlistApi.getMine(token);

      setWishlist(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ADD to wishlist
  const addToWishlist = async (carId) => {
    setLoading(true);
    try {
      const response = await WishlistApi.add(carId, token);
      // update local state instead of refetching
      setWishlist((prev) => [...prev, { car_id: carId }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // REMOVE from wishlist
  const removeFromWishlist = async (carId) => {
    setLoading(true);

    try {
      await WishlistApi.removeOne(carId, token);

      // update local state
      setWishlist((prev) => prev.filter((item) => item.car_id !== carId));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper function
  const isInWishlist = (carId) =>
    wishlist.some((item) => item.car_id === carId);

  // Fetch wishlist automatically on load
  useEffect(() => {
    if (!token) return;
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
