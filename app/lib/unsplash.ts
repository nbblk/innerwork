import axios from "axios";

export const fetchRandomImage = async () => {
  try {
    const response = await axios(`https://api.unsplash.com/photos/random`, {
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
      },
      params: {
        query: "abstract, minimal",
        orientation: "squarish",
        width: 500,
        height: 500,
      },
    });
    return response.data.urls.small as string;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};
