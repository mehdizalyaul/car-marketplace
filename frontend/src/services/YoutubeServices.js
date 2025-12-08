export const fetchReviews = async (carName, apiKey) => {
  const query = `${carName} review`;

  const url =
    `https://www.googleapis.com/youtube/v3/search?` +
    new URLSearchParams({
      part: "snippet",
      q: query,
      type: "video",
      maxResults: 6,
      key: apiKey,
      videoDuration: "medium",
    });

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch YouTube reviews");
  }

  const data = await res.json();
  return data.items;
};
