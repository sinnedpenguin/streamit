export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  image: string;
  cover: string;
  description: string;
  releaseDate: string;
  rating: number;
  similar: Movie[];
};