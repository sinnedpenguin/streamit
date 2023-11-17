export type Movie = {
  media_type: 'movie';
  name: string;
  id: string;
  episodeId: string;
  title: string;
  cover: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  tagline: string;
  vote_average: number;
  runtime: number;
  release_date: string;
  first_air_date: string;
  genres: Genre[];
  cast: Cast[];
  url: string;
  number_of_seasons: string;
  number_of_episodes: string;
};

type Genre = {
  id: string;
  name: string;
};

type Cast = {
  id: string;
  name: string;
}