<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	let overlay: HTMLDivElement;

	onMount(() => {
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
	<slot />
</div>
