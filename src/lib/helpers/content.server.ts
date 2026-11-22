import contentYaml from '../data/content.yaml?raw';
import type { Release, SiteContent } from '#types/content.js';
import type { Song } from '#types/song.js';
// `yaml` is CommonJS, so the synthetic default import is the reliable form at runtime.
import YAML from 'yaml';
import { improveSoundcloudArtwork } from './misc.js';

export type ArtworkSize = 't200x200' | 't500x500';

/**
 * The parsed contents of `src/lib/data/content.yaml`.
 */
export const siteContent = YAML.parse(contentYaml) as SiteContent;

function toSong(release: Release, artworkSize: ArtworkSize): Song {
	return {
		id: release.id,
		permalink: release.permalink,
		title: release.title,
		genre: release.genre,
		releaseDate: new Date(release.releaseDate),
		label: release.label ?? undefined,
		tempo: release.tempo ?? undefined,
		artUrl: improveSoundcloudArtwork(release.artUrl, artworkSize),
		type: release.type ?? '',
		key: release.key ?? undefined,
		artists: release.artists,
		fileUrl: release.audioUrl ?? undefined,
		streamLinks: release.streamLinks,
		downloadLinks: release.downloads
	};
}

/**
 * Returns every release, newest first.
 */
export function getAllSongs(artworkSize: ArtworkSize = 't500x500'): Song[] {
	return [...siteContent.releases]
		.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))
		.map((release) => toSong(release, artworkSize));
}

/**
 * Returns a single release by its permalink.
 */
export function getSong(permalink: string, artworkSize: ArtworkSize = 't500x500'): Song | undefined {
	const release = siteContent.releases.find((entry) => entry.permalink === permalink);
	return release ? toSong(release, artworkSize) : undefined;
}
