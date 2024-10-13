<script lang="ts">
	import Badge from '$components/ui/badge.svelte';
	import { joinList } from '$helpers/text';
	import {
		faApple,
		faSoundcloud,
		faSpotify,
		faYoutube,
		type IconDefinition
	} from '@fortawesome/free-brands-svg-icons';
	import Fa from 'svelte-fa';
	import PlaylistPlus from 'svelte-material-icons/PlaylistPlus.svelte';

	const spotifyPlaylist =
		'https://open.spotify.com/playlist/4TTTfqmLosnucIxEsN8hMY?si=f4cac862e9724a66';
	const socialPlatforms: {
		id: string;
		name: string;
		link: string;
		color: string;
		icon: IconDefinition;
		invertIcon: boolean;
	}[] = [
		{
			id: 'spotify',
			name: 'Spotify',
			link: 'https://open.spotify.com/artist/4OgioomMSaD1ier3lIfgzr',
			color: '#1DB954',
			icon: faSpotify,
			invertIcon: false
		},
		{
			id: 'apple',
			name: 'Apple Music',
			link: 'https://music.apple.com/us/artist/elluzion/563294588',
			color: '#FFFFFF',
			icon: faApple,
			invertIcon: false
		},
		{
			id: 'soundcloud',
			name: 'Soundcloud',
			link: 'https://soundcloud.com/elluzionmusic',
			color: '#FF5500',
			icon: faSoundcloud,
			invertIcon: true
		},
		{
			id: 'youtube',
			name: 'Youtube',
			link: 'https://youtube.com/@elluzion.',
			color: '#FF0000',
			icon: faYoutube,
			invertIcon: true
		}
	];

	export let data;
	let songs = data.songs || [];
</script>

<div class="flex flex-col gap-4 py-5">
	<div class="flex h-24 flex-col justify-end">
		<img src="/elluzion-textlogo.svg" class="mb-2" alt="elluzion logo" width="130" />
	</div>
	<div class="about-card">
		<p>🎹 producer/beatmaker</p>
		<p>✨ 1 mil + streams</p>
	</div>
	<div class="socials-list">
		{#each socialPlatforms as platform}
			<a href={platform.link} target="_blank" style="background-color: {platform.color};">
				<Fa icon={platform.icon} size="1.2x" color={platform.invertIcon ? '#FFFFFF' : '#000000'} />
			</a>
		{/each}
	</div>
	<a class="playlist-banner" href={spotifyPlaylist} target="_blank">
		<PlaylistPlus size="24px" color="#1DB954" />
		<p>subscribe to my <a href={spotifyPlaylist}>spotify playlist</a> to stay updated.</p>
	</a>
	<div class="song-item-list">
		{#each songs as song}
			<a class="song-item" href="/{song.permalink}">
				<img src={song.art_url} alt={song.title} />
				<div class="song-item-text">
					<h5>{song.title}</h5>
					<p>
						{joinList(song.artists)}
						<Badge variant="surfaceVariant">{song.genre}</Badge>
					</p>
				</div>
			</a>
		{/each}
	</div>
</div>

<style lang="postcss">
	.about-card {
		@apply flex flex-col gap-1 rounded-2xl p-5;

		background: url('/image-card-bg.svg');
		background-position: center;
		background-size: cover;
	}

	.about-card p {
		@apply text-sm font-semibold text-onBackground;
	}

	.socials-list {
		@apply grid grid-cols-4 gap-3;
	}

	.socials-list a {
		@apply flex items-center justify-center rounded-full;
		@apply p-3 transition-transform duration-300 ease-out hover:scale-[95%];
	}

	.playlist-banner {
		@apply flex items-center gap-5 rounded-2xl bg-[#03150A];
		@apply px-6 py-4 transition-transform duration-300 ease-out hover:scale-[98%];
	}

	.playlist-banner p {
		@apply text-sm font-semibold text-background ease-out;
	}

	.playlist-banner p a {
		@apply text-[#1DB954] underline underline-offset-2;
	}

	.song-item-list {
		@apply flex flex-col gap-4;
	}

	.song-item {
		@apply flex h-20 gap-4 transition-transform;
		@apply cursor-pointer;
		@apply duration-300 ease-out hover:scale-[98%];
	}

	.song-item img {
		@apply h-full;
		@apply rounded-lg;
	}

	.song-item-text {
		@apply flex flex-col justify-center gap-0.5;
	}

	.song-item-text p {
		@apply flex items-center font-medium;
	}
</style>
