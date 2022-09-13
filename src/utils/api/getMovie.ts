import { Movie } from "src/types";

export const getMovie = async (movie: Movie) => {
  try {
    const data = await fetch(
      `https://api.themoviedb.org/3/${
        movie?.media_type === "tv" ? "tv" : "movie"
      }/${movie?.id}?api_key=${
        process.env.NEXT_PUBLIC_TMBD_API_KEY
      }&language=en-US&append_to_response=videos`
    );

    return data.json();
  } catch (error) {
    console.error(error);
  }
};
