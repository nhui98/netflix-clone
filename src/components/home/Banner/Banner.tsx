import { baseURL } from "@constants/movie";
import { Movie } from "@utils/api/getMovies";
import useStore from "@zustand/store";
import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaInfoCircle, FaPlay } from "react-icons/fa";

export interface BannerProps {
  netflixOriginals: Movie[];
}

const Banner: NextPage<BannerProps> = ({ netflixOriginals }) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const setShowModal = useStore((state) => state.setShowModal);
  const setCurrentMovie = useStore((state) => state.setCurrentMovie);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  const toggleModal = () => {
    if (movie) setCurrentMovie(movie);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          layout="fill"
          src={`${baseURL}${movie?.backdrop_path || movie?.poster_path}`}
          alt={movie?.name}
          objectFit="cover"
        />
      </div>

      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs drop-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>

      <div className="flex gap-x-3">
        <button className="bannerBtn bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
          Play
        </button>
        <button className="bannerBtn bg-[gray]/70" onClick={toggleModal}>
          More Info <FaInfoCircle className="h-5 w-5 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
