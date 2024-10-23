<script lang="ts">
	import { onMount } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let {
		variant = 'primary',
		clickable = $bindable(false),
		href = undefined,
		target = '_blank',
		onclick = undefined,
		children = undefined,
		...rest
	}: Props = $props();

	interface Props extends HTMLButtonAttributes {
		variant?: buttonVariants;
		clickable?: boolean;
		href?: string;
		target?: string;
		onclick?: (e: Event) => void;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	type buttonVariants = 'primary' | 'secondary' | 'surface' | 'surfaceVariant';

	let button = $state<HTMLButtonElement>();

	onMount(() => {
		if (href) {
			clickable = true;
			button?.addEventListener('click', (e) => {
				e.preventDefault();
				window.open(href, target);
			});
		}
	});
</script>

<button
	bind:this={button}
	{onclick}
	{...rest}
	class={`${variant} ${clickable ? 'cursor-pointer' : 'pointer-events-none select-none'} ${rest.class || ''}`}
>
	{@render children?.()}
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
