<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		rounded?: boolean;
		variant?: 'primary' | 'secondary' | 'surface';
		size?: 'icon' | 'default';
		hoverAnim?: boolean;
		children?: import('svelte').Snippet;
		onclick?: (e: Event) => void;
		[key: string]: any;
	}

	let {
		rounded = false,
		variant = 'primary',
		size = 'default',
		hoverAnim = false,
		onclick = undefined,
		children = undefined,
		...rest
	}: Props = $props();
</script>

<button
	{onclick}
	{...rest}
	class={`${variant} ${rest.class || ''}`}
	class:!rounded-full={rounded}
	class:hoverAnim
	class:size-icon={size === 'icon'}
>
	{@render children?.()}
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
