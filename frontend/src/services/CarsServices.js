const BASE_URL = "http://localhost:5000/api/cars";

// FILTER CARS
export async function getFiltered(filters = {}, page, pageSize) {
  try {
    const params = new URLSearchParams();

    // Pagination
    params.append("page", page);
    params.append("pageSize", pageSize);

    // Filters (supports multiple values)
    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
    });

    const url = `${BASE_URL}?${params.toString()}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error in getFiltered:", err.message);
    return { error: true, message: err.message };
  }
}
