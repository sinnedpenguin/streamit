export type Movie = {
  media_type?: 'movie';
  name: string;
  id: string;
  episodeId: string;
  title: string;
  cover: string;
  poster_path: string;
  backdrop_path: string;
  releaseDate: string;
  overview: string;
  tagline: string;
  vote_average: number;
  runtime: number;
  release_date: string;
  genres: Genre[];
  cast: Cast[];
  url: string;
};

type Genre = {
  id: string;
  name: string;
};

type Cast = {
  id: string;
  name: string;
}