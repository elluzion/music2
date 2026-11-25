import type { Platform } from '#types/platform.js';
import {
	IconBrandAmazon,
	IconBrandApple,
	IconBrandDeezer,
	IconBrandDiscord,
	IconBrandInstagram,
	IconBrandSoundcloud,
	IconBrandSpotify,
	IconBrandTidal,
	IconBrandYoutube,
	IconMusic
} from '@tabler/icons-svelte';
import { extractDomain } from '../helpers/text';

export const PLATFORMS: Platform[] = [
	{
		id: 'amazon-music',
		name: 'Amazon Music',
		color: '#FF9900',
		icon: IconBrandAmazon,
		foregroundColor: 'dark',
		linkIncludes: 'amazon'
	},
	{
		id: 'apple-music',
		name: 'Apple Music',
		color: '#ffffff',
		icon: IconBrandApple,
		foregroundColor: 'dark',
		linkIncludes: 'apple'
	},
	{
		id: 'deezer',
		name: 'Deezer',
		color: '#A238FF',
		icon: IconBrandDeezer,
		foregroundColor: 'light',
		linkIncludes: 'deezer'
	},
	{
		id: 'pandora',
		name: 'Pandora',
		color: '#fb4dc1',
		icon: IconMusic,
		foregroundColor: 'dark',
		linkIncludes: 'pandora'
	},
	{
		id: 'soundcloud',
		name: 'SoundCloud',
		color: '#ff5500',
		icon: IconBrandSoundcloud,
		foregroundColor: 'dark',
		linkIncludes: 'soundcloud'
	},
	{
		id: 'spotify',
		name: 'Spotify',
		color: '#1DB954',
		icon: IconBrandSpotify,
		foregroundColor: 'dark',
		linkIncludes: 'spotify'
	},
	{
		id: 'tidal',
		name: 'Tidal',
		color: '#000000',
		icon: IconBrandTidal,
		foregroundColor: 'light',
		linkIncludes: 'tidal'
	},
	{
		id: 'youtube',
		name: 'YouTube',
		color: '#FF0000',
		icon: IconBrandYoutube,
		foregroundColor: 'light',
		linkIncludes: 'youtu'
	},
	{
		id: 'discord',
		name: 'Discord',
		color: '#5865F2',
		icon: IconBrandDiscord,
		foregroundColor: 'light',
		linkIncludes: 'discord'
	},
	{
		id: 'instagram',
		name: 'Instagram',
		color: '#E1306C',
		icon: IconBrandInstagram,
		foregroundColor: 'light',
		linkIncludes: 'instagram'
	}
] as const;

/**
 * Resolves a platform based on the given query.
 *
 * @param {string} query - The query to resolve the platform. If it is a URL, it will search for a platform that includes the query in its linkIncludes property. Otherwise, it will search for a platform with an id matching the query.
 * @return {Platform} The resolved platform.
 * @throws {Error} If no platform is found.
 */
export function resolvePlatform(query: string): Platform {
	const fallback: Platform = {
		id: 'default',
		name: 'Default',
		color: '#ffffff',
		foregroundColor: 'dark',
		icon: IconMusic,
		linkIncludes: ''
	};

	if (query.startsWith('http://') || query.startsWith('https://')) {
		// If the query is a URL, search for a platform that includes the URL in its linkIncludes property
		const platform = PLATFORMS.find((x) => query.includes(x.linkIncludes));

		if (!platform) {
			fallback.name = extractDomain(query) || fallback.name;
			return fallback;
		}
		return platform;
	} else {
		return PLATFORMS.find((p) => p.id === query) || fallback;
	}
}
