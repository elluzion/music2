<script lang="ts">
	import Badge from '$components/ui/badge.svelte';
	import type { DownloadLink } from '$lib/types/song';

	export let downloadLink: DownloadLink;
</script>

<Badge
	variant="secondary"
	class="cursor-pointer gap-2 !pr-1 text-onSecondary"
	href={downloadLink.url}
	target="_blank"
	clickable
>
	{downloadLink.edit}
	<span
		class="flex h-[22px] items-center justify-center rounded-full bg-black/20 px-2 py-2 font-mono text-xs text-onSecondary/70"
	>
		{downloadLink.format}
	</span>
</Badge>
