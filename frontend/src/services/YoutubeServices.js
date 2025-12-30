export const fetchReviews = async (carName) => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

    if (!apiKey) {
        throw new Error("YouTube API key is not configured");
    }

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
