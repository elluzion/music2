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
import { extractDomain } from './text';

export const MusicPlatforms: Platform[] = [
	{
		id: 'amazon-music',
		name: 'Amazon Music',
		color: '#FF9900',
		icon: IconBrandAmazon,
		linkIncludes: 'amazon'
	},
	{
		id: 'apple-music',
		name: 'Apple Music',
		color: '#000000',
		icon: IconBrandApple,
		linkIncludes: 'apple'
	},
	{
		id: 'deezer',
		name: 'Deezer',
		color: '#A238FF',
		icon: IconBrandDeezer,
		linkIncludes: 'deezer'
	},
	{
		id: 'pandora',
		name: 'Pandora',
		color: '#fb4dc1',
		icon: IconMusic,
		linkIncludes: 'pandora'
	},
	{
		id: 'soundcloud',
		name: 'SoundCloud',
		color: '#ff5500',
		icon: IconBrandSoundcloud,
		linkIncludes: 'soundcloud'
	},
	{
		id: 'spotify',
		name: 'Spotify',
		color: '#1DB954',
		icon: IconBrandSpotify,
		linkIncludes: 'spotify'
	},
	{
		id: 'tidal',
		name: 'Tidal',
		color: '#000000',
		icon: IconBrandTidal,
		linkIncludes: 'tidal'
	},
	{
		id: 'youtube',
		name: 'YouTube',
		color: '#FF0000',
		icon: IconBrandYoutube,
		linkIncludes: 'youtu'
	}
] as const;

export const Platforms: Platform[] = [
	{
		id: 'discord',
		name: 'Discord',
		color: '#5865F2',
		icon: IconBrandDiscord,
		linkIncludes: 'discord'
	},
	{
		id: 'instagram',
		name: 'Instagram',
		color: '#E1306C',
		icon: IconBrandInstagram,
		linkIncludes: 'instagram'
	},
	...MusicPlatforms
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
		icon: IconMusic,
		linkIncludes: ''
	};

	if (query.startsWith('http://') || query.startsWith('https://')) {
		// If the query is a URL, search for a platform that includes the URL in its linkIncludes property
		const platform = Platforms.find((x) => query.includes(x.linkIncludes));

		if (!platform) {
			fallback.name = extractDomain(query) || fallback.name;
			return fallback;
		}
		return platform;
	} else {
		return Platforms.find((p) => p.id === query) || fallback;
	}
}
