import { BASE_URL } from "../db";

export async function getCars({
  filters = {},
  search = "",
  page = 1,
  pageSize = 12,
  token,
}) {
  try {
    const params = new URLSearchParams();

    // Pagination
    params.append("page", page);
    params.append("pageSize", pageSize);

    // Search
    if (search.trim()) {
      params.append("search", search);
    }

    // Filters
    Object.entries(filters).forEach(([key, value]) => {
      if (!value || value.length === 0) return;

      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
    });

    const url = `${BASE_URL}${token ? "/auth" : ""}?${params.toString()}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("getCars error:", err.message);
    return { error: true, message: err.message };
  }
}
