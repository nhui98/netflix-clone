import { Product } from "@stripe/firestore-stripe-payments";
import { DocumentData } from "firebase/firestore";

// Home types
export interface HomeProps {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  products: Product[];
}

export interface BannerProps {
  netflixOriginals: Movie[];
}

export interface RowProps {
  title: string;
  movies: Movie[];
}

export interface ThumbnailProps {
  movie: Movie;
}

export interface PlansProps {
  products: Product[];
}

// Authentication types
export interface Inputs {
  email: string;
  password: string;
}

// Movie api
export interface Movie {
  adult: boolean;
  title: string;
  backdrop_path: string;
  media_type?: string;
  release_date?: string;
  first_air_date?: string;
  genre_ids: number[];
  id: number;
  name?: string;
  origin_country?: string[];
  original_language: string;
  original_name?: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  video: boolean;
}

export type Element = {
  type:
    | "Bloopers"
    | "Featurette"
    | "Behind the Scenes"
    | "Clip"
    | "Trailer"
    | "Teaser";
};

export type Genre = {
  id: number;
  name: string;
};
