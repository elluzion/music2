<script lang="ts">
	import { onMount } from 'svelte';
	import Overlay from './overlay.svelte';

	let isScrolled = false;

	onMount(() => {
		window.addEventListener('scroll', () => {
			isScrolled = window.scrollY > 16;
		});
	});
</script>

<Overlay>
	<div class="fixed inset-0 h-min w-full p-4">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-missing-attribute -->
		<a
			on:click={() => history.back()}
			class:bg-surface={isScrolled}
			class:!px-3={isScrolled}
			class="cursor-pointer rounded-full p-2 px-0 text-sm font-medium text-secondary underline-offset-2 transition-all duration-300 hover:underline"
		>
			&lt;&lt; go back
		</a>
	</div>
</Overlay>
