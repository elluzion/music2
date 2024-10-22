<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export let rounded: boolean = false;
	export let variant: buttonVariants = 'primary';
	export let size: 'icon' | 'default' = 'default';
	export let hoverAnim: boolean = false;

	type $$Props = HTMLButtonAttributes & {
		rounded?: boolean;
		variant?: buttonVariants;
		size?: 'icon' | 'default';
		hoverAnim?: boolean;
	};

	type buttonVariants = 'primary' | 'secondary' | 'surface';
</script>

<button
	on:click
	{...$$restProps}
	class={`${variant} ${$$restProps.class || ''}`}
	class:!rounded-full={rounded}
	class:hoverAnim
	class:size-icon={size === 'icon'}
>
	<slot></slot>
</button>

<style lang="postcss">
	button {
		@apply h-12 rounded-lg bg-primary px-4 py-2 text-onPrimary transition-transform ease-out;
		transition-property: filter, transform;
	}

	button.size-icon {
		@apply flex h-10 w-10 items-center justify-center rounded-full px-2 text-center;
	}

	button:hover {
		@apply brightness-110;
	}

	button.hoverAnim {
		@apply hover:scale-[97%];
	}

	button.secondary {
		@apply bg-secondary text-onSecondary;
	}

	button.surface {
		@apply bg-surface text-onSurface;
	}
</style>
