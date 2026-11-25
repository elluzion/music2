<script lang="ts">
	import Card from '#components/ui/card.svelte';

	const tools: { title: string; description: string; href: string }[] = [
		{
			title: 'Audio analyzer',
			description: 'Get key, tempo and loudness from an audio file',
			href: '/tools/analyzer'
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
		<h2>Tools</h2>
		{#each tools as tool (tool.href)}
			<Card href={tool.href}>
				<span class="pt-0 font-sans2 font-semibold">{tool.title}</span>
				<p class="text-sm font-medium">{tool.description}</p>
			</Card>
		{/each}
	</div>
</div>
