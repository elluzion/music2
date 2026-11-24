<script lang="ts">
	import { page } from '$app/state';
	import PlayerWidget from '#components/player-widget.svelte';
	import Button from '#components/ui/button.svelte';
	import { resolvePlatform } from '#lib/helpers/platforms.js';
	import { joinList } from '#lib/helpers/text.js';
	import { onMount } from 'svelte';
	import SongInfoSheet from './_components/song-info-sheet.svelte';

	let { data } = $props();

	let song = $derived(data.song!);
	let metadata = $derived(data.metadata!);
	let streamLinks = $derived(song.streamLinks.map((x) => resolvePlatform(x)));

	// Brand colors that are (near) black would vanish on the dark surface.
	function isInverting(color: string) {
		return color.toLowerCase() === '#000000' || color.toLowerCase() === '#000';
	}

	function textColor(color: string) {
		return isInverting(color) ? 'var(--color-onBackground)' : color;
	}

	onMount(() => {
		if (!data.song) {
			window.location.href = '/';
		}
	});

	// Keep the OS media controls in sync when navigating between releases,
	// where the page component is reused instead of remounted.
	$effect(() => {
		if (!song) return;
		if (!('mediaSession' in navigator) || !navigator.mediaSession) return;

		navigator.mediaSession.metadata = new MediaMetadata({
			title: song.title,
			artist: joinList(song.artists),
			artwork: [
				{
					src: song.artUrl,
					type: 'image/png'
				}
			]
		});
	});
</script>

<svelte:head>
	<title>{metadata.title} | Elluzion</title>
	<meta name="description" content={metadata.description} />
	<meta property="og:title" content={metadata.title} />
	<meta property="og:type" content="music:song" />
	<meta property="og:url" content={page.url.pathname} />
	<meta property="og:image" content={metadata.image} />
</svelte:head>

{#if song}
	<!-- Head -->
	<div class="flex flex-col items-center gap-4 py-4 pb-4">
		<div class="flex aspect-square max-h-[400px] w-full max-w-[400px] flex-col items-center justify-center gap-8">
			<img src={song.artUrl} alt={song.title} class="w-1/2 rounded-3xl" />
			<div class="flex flex-col items-center gap-1 *:text-center">
				<h2>{song.title}</h2>
				<p class="font-medium">{joinList(song.artists)}</p>
			</div>
		</div>
		<!-- Player -->
		{#if song.fileUrl}
			<PlayerWidget fileUrl={song.fileUrl} />
		{/if}
		<!-- Links -->
		<div class="flex w-full flex-col gap-2">
			{#each streamLinks as link, i (link.id)}
				<Button
					variant="surface"
					style="color: {textColor(link.color)}"
					class="flex !h-14 w-full items-center justify-center gap-2 font-medium"
					hoverAnim
					onclick={() => window.open(song.streamLinks[i], '_blank')}
				>
					<link.icon size={20} color={isInverting(link.color) ? 'currentColor' : link.color} />
					{link.name}
				</Button>
			{/each}
		</div>

		<SongInfoSheet {song} />
	</div>
{/if}
