import { db } from "@firebase/firebase";
import { useAuth } from "@hooks/useAuth";
import { getMovie } from "@utils/api/getMovie";
import useStore from "@zustand/store";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";
import { FaCheckCircle, FaPlay, FaPlus } from "react-icons/fa";
import { FiThumbsUp } from "react-icons/fi";
import ReactPlayer from "react-player/lazy";
import { Element, Genre, Movie } from "src/types";

const Modal = () => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const showModal = useStore((state) => state.showModal);
  const setShowModal = useStore((state) => state.setShowModal);
  const movie = useStore((state) => state.currentMovie);
  const setCurrentMovie = useStore((state) => state.setCurrentMovie);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(true);
  const [addedToList, setAddedToList] = useState(false);
  const { user } = useAuth();
  const [movies, setMovies] = useState<DocumentData[] | Movie[]>([]);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    if (showModal) {
      modal.showModal();
      window.document.body.style.overflowY = "hidden";
    } else {
      modal.close();
      window.document.body.style.overflowY = "scroll";
      setCurrentMovie(null);
    }

    return () => {
      modal.close();
      window.document.body.style.overflowY = "scroll";
      setCurrentMovie(null);
    };
  }, [showModal, setCurrentMovie]);

  useEffect(() => {
    async function fetchMovie() {
      if (!movie) return;
      const data = await getMovie(movie);

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (el: Element) => el.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }

      if (data?.genres) setGenres(data.genres);
    }

    fetchMovie();
  }, [movie]);

  // Find all the movies in the user's list
  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, "customers", user.uid, "myList"),
        (snapshot) => setMovies(snapshot.docs)
      );
    }
  }, [movie?.id, user]);

  // Check if the movie is already in the user's list
  useEffect(
    () =>
      setAddedToList(
        movies.findIndex((result) => result.data().id === movie?.id) !== -1
      ),
    [movies]
  );

  const handleList = async () => {
    if (addedToList) {
      if (!user || !movie) return;
      await deleteDoc(
        doc(db, "customers", user.uid, "myList", movie?.id.toString())
      );

      toast(
        `${movie.title || movie.original_name} has been removed from my list`,
        {
          duration: 8000,
        }
      );
    } else {
      if (!user || !movie) return;
      await setDoc(
        doc(db, "customers", user.uid, "myList", movie.id.toString()),
        {
          ...movie,
        }
      );

      toast(`${movie.title || movie.original_name} has been added to my list`, {
        duration: 8000,
      });
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <dialog
      onClose={handleClose}
      ref={modalRef}
      className="fixed top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md bg-transparent backdrop:bg-black/90"
    >
      <Toaster position="bottom-center" />
      <button
        onClick={handleClose}
        className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
      >
        <AiOutlineClose className="h-4 w-4 text-white" />
      </button>

      <div className="relative pt-[56.25%]">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailer}`}
          width="100%"
          height="100%"
          style={{ position: "absolute", top: "0", left: "0" }}
          playing
          muted={muted}
        />

        <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
          <div className="flex space-x-2">
            <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
              <FaPlay className="h-7 w-7 text-black" />
              Play
            </button>

            <button className="modalButton" onClick={handleList}>
              {addedToList ? (
                <FaCheckCircle className="h-5 w-5 text-white" />
              ) : (
                <FaPlus className="h-5 w-5 text-white" />
              )}
            </button>

            <button className="modalButton">
              <FiThumbsUp className="h-5 w-5 text-white" />
            </button>
          </div>

          <button
            className="modalButton"
            onClick={() => setMuted((state) => !state)}
          >
            {muted ? (
              <BsFillVolumeMuteFill className="h-5 w-5 text-white" />
            ) : (
              <BsFillVolumeUpFill className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      </div>

      <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8 text-white">
        <div className="space-y-6 text-lg">
          <div className="flex items-center space-x-2 text-sm">
            <p className="font-semibold text-green-400 ">
              {movie && movie?.vote_average * 10}% Match
            </p>
            <p className="font-light">
              {movie?.release_date || movie?.first_air_date}
            </p>
            <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
              HD
            </div>
          </div>

          <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
            <p className="w-5/6 ">{movie?.overview}</p>
            <div className="flex flex-col space-y-3 text-sm">
              <div>
                <span className="text-[gray]">Genres: </span>
                {genres.map((genre) => genre.name).join(", ")}
              </div>
              <div>
                <span className="text-[gray]">Original language: </span>
                {movie?.original_language}
              </div>
              <div>
                <span className="text-[gray]">Total votes: </span>
                {movie?.vote_count}
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
