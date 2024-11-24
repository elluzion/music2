import DatabaseHelper from "$lib/helpers/database";
import { formatDate } from "$lib/helpers/date";
import { improveSoundcloudArtwork } from "$lib/helpers/misc";
import type { Song } from "$lib/types/song";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params: { permalink } }) => {
  const song = await DatabaseHelper.getSong(permalink);

  if (!song) {
    return redirect(303, "/");
  }

  const metadata = genMetadata(song);

  return { song, metadata };
};

/**
 * Generates metadata for a song including title, description, and image URL.
 *
 * @param {Song} song - The song object for which metadata is to be generated.
 * @returns An object containing the song's title, a description with its release date and label, and an image URL.
 *          The description is formed as "Released on <date> (via <label>)". The image URL is adjusted to a larger size if it is from SoundCloud.
 */
function genMetadata(song: Song) {
  const fallbackImageUrl =
    "https://i1.sndcdn.com/avatars-Sen1bkxTWtJUDjut-zCRlvQ-t500x500.jpg";

  // generate description
  const description = `Released on ${formatDate(song.releaseDate)}${
    song.label ? " via " + song.label : ""
  }.`;
  /**
   * Note: this is a hacky way of getting a larger image,
   * since Souncloud could potentially change their API and break it
   */
  let image = song.artUrl || fallbackImageUrl;
  image = improveSoundcloudArtwork(image, "t500x500");

  return {
    title: song.title,
    description,
    image: image,
  };
}
