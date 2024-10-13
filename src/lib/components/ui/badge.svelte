<script lang="ts">
	import { onMount } from 'svelte';

	export let variant: buttonVariants = 'primary';
	export let clickable = false;
	export let href: string | undefined = undefined;
	export let target = '_blank';

	type buttonVariants = 'primary' | 'secondary' | 'surface' | 'surfaceVariant';

	let button: HTMLButtonElement;

	onMount(() => {
		if (href) {
			clickable = true;
			button.addEventListener('click', (e) => {
				e.preventDefault();
				window.open(href, target);
			});
		}
	});
</script>

<button
	bind:this={button}
	on:click
	{...$$restProps}
	class={`${variant} ${clickable ? 'cursor-pointer' : 'pointer-events-none select-none'} ${$$restProps.class || ''}`}
>
	<slot></slot>
</button>

<style lang="postcss">
	button {
		@apply flex w-max items-center justify-center rounded-full;
		@apply bg-primary px-2.5 py-1 text-xs font-medium text-onPrimary;
		@apply transition-[filter] duration-300;
	}
	button.secondary {
		@apply bg-secondary text-onSecondary;
	}

	button:hover {
		@apply brightness-110;
	}

	button.surface {
		@apply bg-surface text-onSurface;
	}

	button.surfaceVariant {
		@apply bg-surfaceVariant text-secondary;
	}
</style>
