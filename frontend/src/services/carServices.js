const BASE_URL = "http://localhost:5000/api/cars"; 

// GET ALL CARS 
export async function getAll() {
  try {
    const res = await fetch(`${BASE_URL}`);

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error in getAll:", err.message);
    return { error: true, message: err.message };
  }
}


// FILTER CARS 
export async function filter(filters = {}) {
  try {
    const params = new URLSearchParams();

    if (filters.brand) params.append("brand", filters.brand);
    if (filters.fuel) params.append("fuel", filters.fuel);
    if (filters.transmission) params.append("transmission", filters.transmission);

    if (filters.minMileage) params.append("minMileage", filters.minMileage);
    if (filters.maxMileage) params.append("maxMileage", filters.maxMileage);

    if (filters.minPrice) params.append("minPrice", filters.minPrice);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

    if (filters.location) params.append("location", filters.location);

    const res = await fetch(`${BASE_URL}/filter?${params.toString()}`);

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json();
    return data;

  } catch (err) {
    console.error("Error in filter:", err.message);
    return { error: true, message: err.message };
  }
}
