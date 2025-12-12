import { BASE_URL } from "../db";

export async function getFiltered(filters = {}, page, pageSize, token) {
  try {
    const params = new URLSearchParams();

    // Pagination
    params.append("page", page);
    params.append("pageSize", pageSize);

    // Filters
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
    });

    // Choose endpoint
    const url = `${BASE_URL}${token ? "/auth" : ""}?${params.toString()}`;

    // Build fetch options safely
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error in getFiltered:", err.message);
    return { error: true, message: err.message };
  }
}
