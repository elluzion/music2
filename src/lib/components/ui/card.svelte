<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		href?: string | null;
		onclick?: () => void | null;
	}

	let { children, onclick, href }: Props = $props();

	/** Root-relative and relative paths stay in the app; schemes and `//` do not. */
	function isInternalHref(path: string) {
		return !path.startsWith('//') && !/^[a-z][a-z\d+.-]*:/i.test(path);
	}

	let isExternal = $derived(!!href && !isInternalHref(href));
	let opensInNewTab = $derived(!!href && (/^https?:\/\//i.test(href) || href.startsWith('//')));

	function handleClick(event: MouseEvent) {
		onclick?.();

		if (!href || isExternal || event.defaultPrevented) return;
		// Leave modified clicks (new tab, download, …) and in-page anchors to the browser.
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || href.startsWith('#')) return;

		event.preventDefault();
		void goto(href);
	}
</script>

{#if href || onclick}
	<a
		{href}
		onclick={handleClick}
		target={opensInNewTab ? '_blank' : undefined}
		rel={opensInNewTab ? 'noopener noreferrer' : undefined}
		class="hover-scale rounded-2xl bg-surface p-4"
	>
		{@render children?.()}
	</a>
{:else}
	<div class="rounded-2xl bg-surface p-4">
		{@render children?.()}
	</div>
{/if}
