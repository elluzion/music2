import DatabaseHelper from '$lib/helpers/database';
import { improveSoundcloudArtwork } from '$lib/helpers/misc';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const { data } = (await DatabaseHelper.getAllSongs());

    const songs = data?.map((song) => {
        return {
            ...song,
            art_url: improveSoundcloudArtwork(song.art_url, "t200x200"),
        }
    })

    return {
        songs
    };
}) satisfies PageServerLoad;