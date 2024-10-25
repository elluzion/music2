import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";
import type { Song } from "$types/song";
import type { Database as DbType } from "$types/supabase";
import { createClient } from "@supabase/supabase-js";
import { improveSoundcloudArtwork } from "./misc";

export default class DatabaseHelper {
  /**
   * Retrieves all songs from the database, ordered by newest first.
   * @returns {Promise<SupabaseClient<DbType>['data']['rows']>} A promise that resolves to an array of song objects.
   */
  static getAllSongs() {
    return supabase.from("releases").select("*").order("release_date", { ascending: false });
  }

  /**
   * Retrieves a song from the database by its permalink.
   * @param {string} permalink The permalink of the song to retrieve.
   * @returns {Promise<Song | undefined>} A promise that resolves to the song object, or undefined if the song
   * does not exist.
   */
  static async getSong(permalink: string) {
    const { data: track } = await supabase
      .from('releases')
      .select(songQuery)
      .eq('permalink', permalink)
      .single();

    if (track) {
      const song: Song = {
        id: track.id,
        permalink: track.permalink,
        title: track.title,
        genre: track.genre,
        releaseDate: new Date(track.release_date),
        label: track.label || undefined,
        tempo: track.tempo || undefined,
        artUrl: improveSoundcloudArtwork(track.art_url),
        type: track.type,
        key: track.key || undefined,
        artists: track.artists,
        streamLinks: track.stream_links.map((link) => link.url) || [],
        downloadLinks: track.download_links || [],
        fileUrl: track.file_url || undefined,
      };
      return song;
    }
  }
}

const songQuery = `
  id,
  permalink,
  artists,
  title,
  description,
  stream_links:release_links(url),
  download_links:release_downloads(url, edit, format),
  genre,
  release_date,
  label,
  tempo,
  art_url,
  type,
  key,
  file_url
`;

const supabase = createClient<DbType>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);