<script lang="ts">
	import Button from '$components/ui/button.svelte';
	import { resolvePlatform } from '$lib/helpers/platforms';
	import { joinList } from '$lib/helpers/text';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import type { PageServerData } from './$types';
	import SongInfoSheet from './_components/song-info-sheet.svelte';

	export let data: PageServerData;

	$: song = data.song!;
	$: streamLinks = song.streamLinks.map((x) => resolvePlatform(x));

	onMount(() => {
		if (!data.song) {
			return (window.location.href = '/');
		}
	});
</script>

{#if song}
	<div class="flex flex-col items-center py-4 pb-[104px]">
		<!-- Head -->
		<a
			href="/"
			class="h-min w-full pb-4 pr-4 text-sm font-medium text-secondary underline-offset-2 hover:underline"
		>
			&lt;&lt; go back
		</a>
		<div
			class="flex aspect-square max-h-[400px] w-full max-w-[400px] flex-col items-center justify-center gap-8"
		>
			<img src={song.artUrl} alt={song.title} class="w-1/2 rounded-3xl" />
			<div class="flex flex-col items-center gap-1 *:text-center">
				<h2>{song.title}</h2>
				<p class="font-medium">{joinList(song.artists)}</p>
			</div>
		</div>
		<!-- Links -->
		<div class="flex w-full flex-col gap-2">
			{#each streamLinks as link, i}
				<Button
					variant="surface"
					style="color: {link.color}"
					class="flex !h-14 w-full items-center justify-center gap-2 font-medium"
					hoverAnim
					on:click={() => (window.location.href = song.streamLinks[i])}
				>
					<Fa icon={link.icon} size="1.2x" color={link.color} />
					{link.name}
				</Button>
			{/each}
		</div>

		<SongInfoSheet {song} />
	</div>
{/if}
