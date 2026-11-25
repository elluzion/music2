<script lang="ts">
	import InfoSheet from '#components/info-sheet.svelte';
	import Badge from '#components/ui/badge.svelte';
	import { formatDate } from '#lib/helpers/date.js';
	import type { Song } from '#lib/types/song.js';
	import DownloadBadge from './download-badge.svelte';

	interface Props {
		song: Song;
	}

	let { song }: Props = $props();

	let downloadCount = $derived(song.downloadLinks.length);

	let downloadFormats = $derived(() => {
		const formats = song.downloadLinks.map((link) => link.format);
		const uniqueFormats = new Set(formats);
		return Array.from(uniqueFormats);
	});
</script>

<InfoSheet>
	{#snippet preview()}
		<div class="flex items-center justify-center gap-3" role="button">
			{#if song.releaseDate}
				<span>📅</span>
			{/if}
			{#if song.tempo}
				<span>🐢</span>
			{/if}
			{#if song.key}
				<span>🎹</span>
			{/if}
			{#if song.genre}
				<span>✨</span>
			{/if}
			{#if song.label}
				<span>💿</span>
			{/if}
			{#if downloadCount > 0}
				<Badge variant="secondary" class="pointer-events-none flex gap-2 truncate">
					<span>📂</span>
					<span class="text-sm text-onSecondary/80">
						{downloadFormats().join('/')}
					</span>
				</Badge>
			{/if}
		</div>
	{/snippet}
	<div class="flex flex-col gap-3 *:font-medium *:text-secondary">
		{#if song.releaseDate}
			<span>📅 {formatDate(song.releaseDate)}</span>
		{/if}
		{#if song.tempo}
			<span>🐢 {song.tempo}BPM</span>
		{/if}
		{#if song.key}
			<span>🎹 {song.key}</span>
		{/if}
		{#if song.genre}
			<span>✨ {song.genre}</span>
		{/if}
		{#if song.label}
			<span>💿 {song.label}</span>
		{/if}
		{#if downloadCount > 0}
			<span class="my-1 h-2 w-full bg-[url('/zigzag.svg')] bg-contain bg-repeat-x"></span>
			<div class="flex flex-wrap gap-1.5 pt-1 pr-6">
				<span>📂 </span>
				{#each song.downloadLinks as downloadLink (downloadLink.url)}
					<DownloadBadge {downloadLink} />
				{/each}
			</div>
		{/if}
	</div>
</InfoSheet>
