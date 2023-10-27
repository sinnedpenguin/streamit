import type { PageServerLoad } from './$types';
import { TMDB_API_KEY } from '$env/static/private';

export const load = (async ({ params }) => {
	const page = params;
	const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`);
	const data = await res.json();

	return {
		popularMovies: data.results,
	}
}) satisfies PageServerLoad;