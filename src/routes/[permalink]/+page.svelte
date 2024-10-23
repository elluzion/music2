<script lang="ts">
	import PlayerWidget from '$components/player-widget.svelte';
	import Button from '$components/ui/button.svelte';
	import { resolvePlatform } from '$lib/helpers/platforms';
	import { joinList } from '$lib/helpers/text';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import SongInfoSheet from './_components/song-info-sheet.svelte';

	let { data } = $props();

	let metadata: MediaMetadata | undefined = undefined;
	let player: PlayerWidget | undefined = $state(undefined);

	let song = $derived(data.song!);
	let streamLinks = $derived(song.streamLinks.map((x) => resolvePlatform(x)));

	onMount(() => {
		if (!data.song) {
			return (window.location.href = '/');
		}

		if ('mediaSession' in navigator && player) {
			metadata = new MediaMetadata({
				title: song.title,
				artist: joinList(song.artists),
				artwork: [
					{
						src: song.artUrl,
						type: 'image/png'
					}
				]
			});

			player.setMetadata(metadata);
		}
	});
</script>

{#if song}
	<!-- Head -->
	<div class="flex flex-col items-center gap-4 py-4 pb-[104px]">
		<div
			class="flex aspect-square max-h-[400px] w-full max-w-[400px] flex-col items-center justify-center gap-8"
		>
			<img src={song.artUrl} alt={song.title} class="w-1/2 rounded-3xl" />
			<div class="flex flex-col items-center gap-1 *:text-center">
				<h2>{song.title}</h2>
				<p class="font-medium">{joinList(song.artists)}</p>
			</div>
		</div>
		<!-- Player -->
		{#if song.fileUrl}
			<PlayerWidget bind:this={player} fileUrl={song.fileUrl} />
		{/if}
		<!-- Links -->
		<div class="flex w-full flex-col gap-2">
			{#each streamLinks as link, i}
				<Button
					variant="surface"
					style="color: {link.color}"
					class="flex !h-14 w-full items-center justify-center gap-2 font-medium"
					hoverAnim
					onclick={() => window.open(song.streamLinks[i], '_blank')}
				>
					<Fa icon={link.icon} size="1.2x" color={link.color} />
					{link.name}
				</Button>
			{/each}
		</div>

		<SongInfoSheet {song} />
	</div>
{/if}
