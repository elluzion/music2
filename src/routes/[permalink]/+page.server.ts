import DatabaseHelper from '$lib/helpers/database';
import { improveSoundcloudArtwork } from '$lib/helpers/misc';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({ params: { permalink } }) => {
  const song = await DatabaseHelper.getSong(permalink);

  if (song) {
    song.artUrl = improveSoundcloudArtwork(song.artUrl);
  }

  return { song };
});