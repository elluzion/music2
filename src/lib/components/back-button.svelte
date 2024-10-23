<script lang="ts">
	import { onMount } from 'svelte';
	import Overlay from './overlay.svelte';

	let isScrolled = $state(false);

	onMount(() => {
		window.addEventListener('scroll', () => {
			isScrolled = window.scrollY > 16;
		});
	});
</script>

<Overlay>
	<div class="fixed inset-0 h-min w-full p-4">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_missing_attribute -->
		<a
			onclick={() => history.back()}
			class:bg-surface={isScrolled}
			class:!px-3={isScrolled}
			class="cursor-pointer rounded-full p-2 px-0 text-sm font-medium text-secondary underline-offset-2 transition-all duration-300 hover:underline"
		>
			&lt;&lt; go back
		</a>
	</div>
</Overlay>
