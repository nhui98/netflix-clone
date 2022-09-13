import { Movie } from "src/types";
import create from "zustand";

interface StoreState {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  currentMovie: Movie | null;
  setCurrentMovie: (movie: Movie | null) => void;
}

const useStore = create<StoreState>((set, get) => ({
  showModal: false,
  setShowModal: (value) => set(() => ({ showModal: value })),
  currentMovie: null,
  setCurrentMovie: (movie) => set(() => ({ currentMovie: movie })),
}));

export default useStore;
