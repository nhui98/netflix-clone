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
