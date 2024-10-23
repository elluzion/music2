<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let overlay = $state<HTMLDivElement>();

	onMount(() => {
		if (!overlay) return;

		let container = document.getElementById('overlay-container');
		if (!container) {
			container = document.body.appendChild(document.createElement('div'));
			container.id = 'overlay-container';
		}
		container.appendChild(overlay);
	});

	onDestroy(() => {
		overlay?.remove();
	});
</script>

<div bind:this={overlay} class="overlay">
	{@render children?.()}
</div>
