<script lang="ts">
	import ChevronSelect from '#components/chevron-select.svelte';
	import Badge from '#components/ui/badge.svelte';
	import { joinList } from '#helpers/text.js';
	import { storedState } from '#lib/helpers/localstore.svelte.js';
	import type { SocialPlatform } from '#lib/types/content.js';
	import {
		IconBrandApple,
		IconBrandInstagram,
		IconBrandSoundcloud,
		IconBrandSpotify,
		IconBrandYoutube,
		IconLayoutGrid,
		IconList,
		IconMusic,
		IconPlaylistAdd,
		type Icon
	} from '@tabler/icons-svelte';
	import { blur } from 'svelte/transition';

	let { data } = $props();

	type SocialStyle = {
		name: string;
		color: string;
		icon: Icon;
		invertIcon: boolean;
	};

	const socialStyles: Record<SocialPlatform, SocialStyle> = {
		spotify: {
			name: 'Spotify',
			color: '#1DB954',
			icon: IconBrandSpotify,
			invertIcon: false
		},
		apple: {
			name: 'Apple Music',
			color: '#FFFFFF',
			icon: IconBrandApple,
			invertIcon: false
		},
		soundcloud: {
			name: 'Soundcloud',
			color: '#FF5500',
			icon: IconBrandSoundcloud,
			invertIcon: true
		},
		youtube: {
			name: 'Youtube',
			color: '#FF0000',
			icon: IconBrandYoutube,
			invertIcon: true
		},
		instagram: {
			name: 'Instagram',
			color: '#E1306C',
			icon: IconBrandInstagram,
			invertIcon: true
		}
	};

	const fallbackSocial: SocialStyle = {
		name: 'Link',
		color: '#888888',
		icon: IconMusic,
		invertIcon: true
	};

	let socials = $derived(
		data.socials.map((social) => ({
			id: social.platform,
			link: social.href,
			...(socialStyles[social.platform] ?? fallbackSocial)
		}))
	);

	const trackListTypes: { label: string; value: string; icon: Icon }[] = [
		{
			label: 'List',
			value: 'list',
			icon: IconList
		},
		{
			label: 'Grid',
			value: 'grid',
			icon: IconLayoutGrid
		}
	];

	let trackListType = storedState<string>('trackListType', 'list');

	let songs = $derived(() => data.songs || []);

	const inOptions = { duration: 200, delay: 200, amount: 5 };
	const outOptions = { duration: 200, amount: 5 };
</script>

<div class="page-wrapper">
	<!-- Header -->
	<div class="flex flex-col justify-end">
		<span class="logo mb-2" role="img" aria-label="elluzion logo"></span>
	</div>
	<div class="about-card">
		<p>🎹 producer/beatmaker</p>
		<p>✨ 1 mil + streams</p>
	</div>
	<div class="socials-list">
		{#each socials as platform (platform.id)}
			<a href={platform.link} target="_blank" style="background-color: {platform.color};">
				<platform.icon size={20} color={platform.invertIcon ? '#FFFFFF' : '#000000'} />
			</a>
		{/each}
	</div>
	<a class="playlist-banner" href={data.playlistUrl} target="_blank">
		<IconPlaylistAdd color="#1DB954" />
		<p>
			subscribe to my
			<span class="text-[#1DB954] underline underline-offset-4">spotify playlist</span>
			to stay updated.
		</p>
	</a>

	<!-- Song List -->
	<div class="song-list-type-selector">
		<ChevronSelect bind:value={trackListType.value} items={trackListTypes} />
	</div>
	{#if trackListType.value === 'list'}
		<div class="song-item-list" in:blur={inOptions} out:blur={outOptions}>
			{#each songs() as song (song.id)}
				<a class="song-item" href="/{song.permalink}">
					<img src={song.artUrl} alt={song.title} />
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
	{:else}
		<div class="song-item-grid" in:blur={inOptions} out:blur={outOptions}>
			{#each songs() as song (song.id)}
				<a class="song-item" href="/{song.permalink}">
					<img src={song.artUrl} alt={song.title} />
					<div class="song-item-text">
						<h5>{song.title}</h5>
						<p>
							{joinList(song.artists)}
						</p>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	@reference '../app.css';

	.about-card {
		@apply flex flex-col gap-1 rounded-2xl p-5;

		background: url('/image-card-bg.svg');
		background-position: center;
		background-size: cover;
	}

	.about-card p {
		@apply text-sm font-semibold text-[#2e2e33];
	}

	.logo {
		@apply block h-[30px] w-[127px] bg-onBackground;
		-webkit-mask: url('/elluzion-textlogo.svg') center / contain no-repeat;
		mask: url('/elluzion-textlogo.svg') center / contain no-repeat;
	}

	.socials-list {
		@apply grid grid-cols-5 gap-3;
	}

	.socials-list a {
		@apply flex items-center justify-center rounded-full;
		@apply p-3 transition-transform duration-300 ease-out hover:scale-[95%];
	}

	.playlist-banner {
		@apply flex items-center gap-5 rounded-2xl bg-[#03150A] dark:bg-[#10281a];
		@apply hover-scale px-6 py-4;
	}

	.playlist-banner p {
		@apply text-sm font-semibold text-[#f6f4f3] ease-out;
	}

	.song-item-list {
		@apply flex flex-col gap-4;
	}

	.song-item-list .song-item {
		@apply flex h-20 gap-4;
		@apply cursor-pointer;
		@apply hover-scale;
	}

	.song-item-list .song-item img {
		@apply aspect-square h-full;
		@apply rounded-lg;
	}

	.song-item-list .song-item-text {
		@apply flex flex-col justify-center gap-0.5;
	}

	.song-item-grid {
		@apply grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-3;
	}

	.song-item-grid .song-item {
		@apply flex flex-col items-center gap-4;
		@apply cursor-pointer;
		@apply hover-scale;
	}

	.song-item-grid .song-item img {
		@apply aspect-square w-full;
		@apply rounded-2xl;
	}

	.song-item-grid .song-item-text {
		@apply flex flex-col items-center gap-0.5 px-1 text-center;
	}

	.song-item-text p {
		@apply flex items-center font-medium;
	}
</style>
