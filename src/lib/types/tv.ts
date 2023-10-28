export type TV = {
  media_type?: 'tv';
  id: number;
  name: string;
  cover: string;
  poster_path: string;
  backdrop_path: string;
  releaseDate: string;
  overview: string;
  vote_average: number;
  first_air_date: string;
  similar: TV[];
};