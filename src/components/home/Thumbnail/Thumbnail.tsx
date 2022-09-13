import { Movie } from "@utils/api/getMovies";
import useStore from "@zustand/store";
import { NextPage } from "next";
import Image from "next/image";

export interface ThumbnailProps {
  movie: Movie;
}

const Thumbnail: NextPage<ThumbnailProps> = ({ movie }) => {
  const { backdrop_path, poster_path, name } = movie;
  const setShowModal = useStore((state) => state.setShowModal);
  const setCurrentMovie = useStore((state) => state.setCurrentMovie);

  const toggleModal = () => {
    if (movie) setCurrentMovie(movie);
    setShowModal(true);
  };

  return (
    <div
      className="relative h-28 min-w-[180px] max-w-[260px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={toggleModal}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${backdrop_path || poster_path}`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
        alt={name}
      />
    </div>
  );
};

export default Thumbnail;
