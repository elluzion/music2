import type { DownloadLink } from './song.js';

/**
 * A social platform that can be linked from the site header.
 */
export type SocialPlatform = 'spotify' | 'apple' | 'soundcloud' | 'youtube' | 'instagram';

/**
 * A social profile entry from the site configuration.
 */
export type SocialLink = {
	platform: SocialPlatform;
	href: string;
};

/**
 * A release as stored in the site configuration.
 */
export type Release = {
	id: number;
	title: string;
	permalink: string;
	description: string | null;
	genre: string;
	releaseDate: string;
	label: string | null;
	tempo: number | null;
	key: string | null;
	artUrl: string;
	type: string | null;
	artists: string[];
	audioUrl: string | null;
	hiddenBeforeRelease: boolean;
	streamLinks: string[];
	downloads: DownloadLink[];
};

/**
 * The complete hand-maintained content of the site.
 */
export type SiteContent = {
	playlistUrl: string;
	socials: SocialLink[];
	releases: Release[];
};
