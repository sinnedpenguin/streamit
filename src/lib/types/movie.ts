export type Movie = {
  id: string;
  episodeId: string;
  title: string;
  cover: string;
  poster_path: string;
  backdrop_path: string;
  releaseDate: string;
  overview: string;
  vote_average: number;
  release_date: string;
  similar: Movie[];
  url: string;
};