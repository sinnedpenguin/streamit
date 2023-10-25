import type { PageLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const fetchDetails = async () => {
		const { id } = params;
		const res = await fetch(`${import.meta.env.VITE_DETAILS_URL}${id}?type=movie`);
		const data = await res.json();

		return data;
	}

	return {
		details: await fetchDetails(),
	};
}) satisfies PageLoad;