<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		children?: import('svelte').Snippet;
	}

	let { children, class: className = '', ...rest }: Props = $props();
</script>

<!-- Material Symbols reference: https://fonts.google.com/icons?selected=Material+Symbols+Outlined -->
<span {...rest} class="material-symbols-outlined leading-none {className}" aria-hidden="true">
	{@render children?.()}
</span>
