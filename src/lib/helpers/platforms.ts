import type { Platform } from "$types/platform";
import {
	faAmazon,
	faApple,
	faDeezer,
	faDiscord,
	faInstagram,
	faSoundcloud,
	faSpotify,
	faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { extractDomain } from "./text";

export const MusicPlatforms: Platform[] = [
	{
		id: "amazon-music",
		name: "Amazon Music",
		color: "#FF9900",
		icon: faAmazon,
		linkIncludes: "amazon",
	},
	{
		id: "apple-music",
		name: "Apple Music",
		color: "#000000",
		icon: faApple,
		linkIncludes: "apple",
	},
	{
		id: "deezer",
		name: "Deezer",
		color: "#A238FF",
		icon: faDeezer,
		linkIncludes: "deezer",
	},
	{
		id: "pandora",
		name: "Pandora",
		color: "#fb4dc1",
		icon: faMusic,
		linkIncludes: "pandora",
	},
	{
		id: "soundcloud",
		name: "SoundCloud",
		color: "#ff5500",
		icon: faSoundcloud,
		linkIncludes: "soundcloud",
	},
	{
		id: "spotify",
		name: "Spotify",
		color: "#1DB954",
		icon: faSpotify,
		linkIncludes: "spotify",
	},
	{
		id: "tidal",
		name: "Tidal",
		color: "#000000",
		icon: faMusic,
		linkIncludes: "tidal",
	},
	{
		id: "youtube",
		name: "YouTube",
		color: "#FF0000",
		icon: faYoutube,
		linkIncludes: "youtu",
	},
] as const;

export const Platforms: Platform[] = [
	{
		id: "discord",
		name: "Discord",
		color: "#5865F2",
		icon: faDiscord,
		linkIncludes: "discord",
	},
	{
		id: "instagram",
		name: "Instagram",
		color: "#E1306C",
		icon: faInstagram,
		linkIncludes: "instagram",
	},
	...MusicPlatforms,
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
		id: "default",
		name: "Default",
		color: "#ffffff",
		icon: faMusic,
		linkIncludes: "",
	};

	if (query.startsWith("http://") || query.startsWith("https://")) {
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
