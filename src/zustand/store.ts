import { Movie } from "@utils/api/getMovies";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface StoreState {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  currentMovie: Movie | null;
  setCurrentMovie: (movie: Movie) => void;
}

const useStore = create<StoreState>((set, get) => ({
  showModal: false,
  setShowModal: (value) => set(() => ({ showModal: value })),
  currentMovie: null,
  setCurrentMovie: (movie) => set(() => ({ currentMovie: movie })),
}));

export default useStore;
