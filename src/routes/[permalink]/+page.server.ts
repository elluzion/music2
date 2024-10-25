import DatabaseHelper from '$lib/helpers/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({ params: { permalink } }) => {
  const song = await DatabaseHelper.getSong(permalink);

  return { song };
});