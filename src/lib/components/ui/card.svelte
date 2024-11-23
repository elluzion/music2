<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		href?: string | null;
		onclick?: () => void | null;
	}

	let { children, onclick, href }: Props = $props();
</script>

{#if href || onclick}
	<a
		{href}
		{onclick}
		target={href?.startsWith('http') ? '_blank' : '_self'}
		class="hover-scale rounded-2xl bg-surface p-4"
	>
		{@render children?.()}
	</a>
{:else}
	<div class="rounded-2xl bg-surface p-4">
		{@render children?.()}
	</div>
{/if}
