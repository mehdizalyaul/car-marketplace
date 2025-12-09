export const getMine = async (token) => {
  try {
    const response = await fetch("http://localhost:8000/api/wishlist", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch wishlist");
    return await response.json();
  } catch (err) {
    console.error("Error fetching wishlist:", err.message);
    throw err;
  }
};

export const add = async (carId, token) => {
  console.log("Adding to wishlist:", carId, token);
  try {
    const response = await fetch(
      `http://localhost:8000/api/wishlist/${carId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) throw new Error("Failed to add to wishlist");
    return await response.json();
  } catch (err) {
    console.error("Error adding to wishlist:", err.message);
    throw err;
  }
};

export const removeOne = async (carId, token) => {
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
    return await response.json();
  } catch (err) {
    console.error("Error removing from wishlist:", err.message);
    throw err;
  }
};
