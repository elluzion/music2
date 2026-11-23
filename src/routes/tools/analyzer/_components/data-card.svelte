<script lang="ts">
	import MaterialSymbol from '#components/material-symbol.svelte';
	import { onMount } from 'svelte';

	interface Props {
		title: string;
		value: string;
		/** Optional secondary line with extra context. */
		hint?: string;
		/** Material Symbols icon name. */
		symbol: string;
		/** Text written to the clipboard; defaults to the displayed value. */
		copyValue?: string;
	}

	let { title, value, hint, symbol, copyValue = value }: Props = $props();

	let isShowing = $state(false);
	let hasCopied = $state(false);
	let timeout: ReturnType<typeof setTimeout> | undefined;

	onMount(() => {
		timeout = setTimeout(() => (isShowing = true), 40);
		return () => clearTimeout(timeout);
	});

	async function copy() {
		if (hasCopied) return;

		try {
			await navigator.clipboard.writeText(copyValue);
			hasCopied = true;
			timeout = setTimeout(() => (hasCopied = false), 2000);
		} catch {
			// Clipboard access can be blocked outside of a secure context.
		}
	}
</script>

<div
	class="group flex flex-col gap-2 rounded-2xl bg-surface p-4 transition-[opacity,translate] duration-300 ease-out {isShowing
		? 'translate-y-0 opacity-100'
		: 'translate-y-2 opacity-0'}"
>
	<div class="flex items-center gap-2 font-medium">
		<MaterialSymbol class="text-secondary">{symbol}</MaterialSymbol>
		<span class="grow text-sm">{title}</span>
		<button
			type="button"
			class="cursor-pointer border-0 bg-transparent p-0 text-secondary transition-opacity {hasCopied
				? 'opacity-100'
				: 'opacity-0 group-hover:opacity-100 focus-visible:opacity-100'}"
			aria-label="Copy {title}"
			onclick={copy}
		>
			<MaterialSymbol class="text-[18px]">{hasCopied ? 'check' : 'content_copy'}</MaterialSymbol>
		</button>
	</div>
	<span class="font-mono text-xl font-semibold">{value}</span>
	{#if hint}
		<span class="font-mono text-xs text-secondary">{hint}</span>
	{/if}
</div>
