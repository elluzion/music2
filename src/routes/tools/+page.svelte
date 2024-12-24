<script lang="ts">
	import Card from '$components/ui/card.svelte';

	const tools: { title: string; description: string; href: string }[] = [
		{
			title: 'Audio analyzer',
			description: 'Receive musical information to an audio file',
			href: 'https://tools.elluzion.space/analyzer'
		},
		{
			title: 'SoundCloud downloader',
			description: 'Download public Soundcloud tracks',
			href: 'https://tools.elluzion.space/downloader'
		}
	];
</script>

<div class="page-wrapper">
	<div class="flex flex-col gap-2">
		<h1>Tools</h1>
		{#each tools as tool}
			<Card href={tool.href}>
				<span class="pt-0 font-sans2 font-semibold">{tool.title}</span>
				<p class="text-sm font-medium">{tool.description}</p>
			</Card>
		{/each}
	</div>
</div>
