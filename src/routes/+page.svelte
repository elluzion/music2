<script lang="ts">
	import ChevronSelect from '#components/chevron-select.svelte';
	import Badge from '#components/ui/badge.svelte';
	import { joinList } from '#helpers/text.js';
	import { resolvePlatform } from '#lib/data/platforms.js';
	import { storedState } from '#lib/helpers/localstore.svelte.js';
	import { IconLayoutGrid, IconList, IconPlaylistAdd } from '@tabler/icons-svelte';
	import { blur } from 'svelte/transition';

	let { data } = $props();

	let socials = $derived(
		data.socials.map((social) => ({
			id: social.platform,
			link: social.href,
			platform: resolvePlatform(social.platform)
		}))
	);

	let trackListType = storedState<string>('trackListType', 'list');

	let songsGroupedByYear = $derived.by(() => {
		const grouped: Record<string, typeof data.songs> = {};
		for (let song of data.songs.sort((a, b) => (a.releaseDate < b.releaseDate ? 1 : -1))) {
			const year = song.releaseDate.getFullYear();
			if (!(year in grouped)) grouped[year] = [];
			grouped[year].push(song);
		}
		return grouped;
	});

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
		{#each socials as social (social.id)}
			<a href={social.link} target="_blank" style="background-color: {social.platform.color};">
				<social.platform.icon size={20} color={social.platform.foregroundColor === 'light' ? '#FFFFFF' : '#000000'} />
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
		<ChevronSelect
			bind:value={trackListType.value}
			items={[
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
			]}
		/>
	</div>
	{#if trackListType.value === 'list'}
		<div class="song-item-list" in:blur={inOptions} out:blur={outOptions}>
			{#each Object.entries(songsGroupedByYear).reverse() as [year, songs]}
				<span class="song-year-title">{year}</span>
				{#each songs as song}
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
			{/each}
		</div>
	{:else}
		<div class="song-item-grid" in:blur={inOptions} out:blur={outOptions}>
			{#each Object.entries(songsGroupedByYear).reverse() as [year, songs]}
				<span class="song-year-title">{year}</span>
				{#each songs as song}
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

		p {
			@apply text-sm font-semibold text-[#2e2e33];
		}
	}

	.logo {
		@apply block h-7.5 w-31.75 bg-onBackground;
		-webkit-mask: url('/elluzion-textlogo.svg') center / contain no-repeat;
		mask: url('/elluzion-textlogo.svg') center / contain no-repeat;
	}

	.socials-list {
		@apply grid grid-cols-5 gap-3;

		a {
			@apply flex items-center justify-center rounded-full;
			@apply p-3 transition-transform duration-300 ease-out hover:scale-[95%];
		}
	}

	.playlist-banner {
		@apply flex items-center gap-5 rounded-2xl bg-[#03150A] dark:bg-[#10281a];
		@apply hover-scale px-6 py-4;

		p {
			@apply text-sm font-semibold text-[#f6f4f3] ease-out;
		}
	}

	.song-item-list {
		@apply flex flex-col gap-4;

		.song-item {
			@apply flex h-20 gap-4;
			@apply cursor-pointer;
			@apply hover-scale;

			img {
				@apply aspect-square h-full;
				@apply rounded-lg;
			}
		}

		.song-item-text {
			@apply flex flex-col justify-center gap-0.5;
		}
	}

	.song-item-text p {
		@apply flex items-center font-medium;
	}

	.song-item-grid {
		@apply grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-3;

		.song-item {
			@apply flex flex-col items-center gap-4;
			@apply cursor-pointer;
			@apply hover-scale;

			img {
				@apply aspect-square w-full;
				@apply rounded-2xl;
			}
		}

		.song-item-text {
			@apply flex flex-col items-center gap-0.5 px-1 text-center;
		}
	}

	.song-year-title {
		@apply col-start-1 -col-end-1 font-semibold tracking-wide text-secondary;
	}
</style>
