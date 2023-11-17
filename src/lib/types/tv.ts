export type TV = {
  media_type: 'tv';
  id: string;
  episodeId: string;
  name: string;
  title: string;
  cover: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  first_air_date: string;
  overview: string;
  tagline: string;
  vote_average: number;
  runtime: number;
  number_of_seasons: number;
  number_of_episodes: number;
  genres: Genre[];
  casts: Cast[];
  seasons: Season[];
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

type Season = {
  id: number; 
  name: string; 
  air_date: string; 
  episode_count: number;
  overview: string; 
  poster_path: string; 
  season_number: number; 
  vote_average: number; 
  season: number;
  episodes: Episode[];
};

export type Episode = {
  id: number; 
  episode: number;
  releaseDate: string;
  title: string; 
  description: string; 
  img: {
    mobile: string;
  }
  url: string;
  season: string;
};
