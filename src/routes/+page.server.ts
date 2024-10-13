import DatabaseHelper from '$lib/helpers/database';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const { data: songs } = (await DatabaseHelper.getAllSongs());

    return {
        songs
    };
}) satisfies PageServerLoad;