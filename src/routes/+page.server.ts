import { getAllSongs, siteContent } from '#lib/helpers/content.server.js';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		songs: getAllSongs('t200x200'),
		playlistUrl: siteContent.playlistUrl,
		socials: siteContent.socials
	};
}) satisfies PageServerLoad;
