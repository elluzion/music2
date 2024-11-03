<script lang="ts">
	import { createSelect, melt } from '@melt-ui/svelte';
	import { ChevronDown } from 'lucide-svelte';
	import type { Component } from 'svelte';

	interface Props {
		items: { label: string; value: any; icon?: Component }[];
		value: any;
		onchange?: (value: any) => void;
	}

	let { items, value = $bindable(), onchange }: Props = $props();

	let menuContainer = $state<HTMLUListElement>();

	const {
		elements: { trigger, menu, label, option },
		states: { open, selected, selectedLabel }
	} = createSelect();

	$selected = items.find((item) => item.value === value) || items[0];

	selected.subscribe((newValue) => {
		value = newValue?.value || undefined;
		if (onchange) onchange(value);
	});

	open.subscribe((value) => {
		if (value && menuContainer) {
			setTimeout(() => {
				if (!menuContainer) return;
				menuContainer.style.opacity = '100%';
				menuContainer.style.transform = 'translateY(0px)';
			});
		}
	});
</script>

<div use:melt={$trigger} class="flex cursor-pointer items-center gap-4 py-2 text-secondary">
	<ChevronDown class="{$open ? 'rotate-180' : ''} transition-transform" />
	<span use:melt={$label} class="user-select-none font-medium">
		{$selectedLabel || 'Nothing selected'}
	</span>
</div>

<ul
	bind:this={menuContainer}
	use:melt={$menu}
	class={`flex -translate-y-4 flex-col gap-1 rounded-2xl bg-surface p-2 opacity-0 shadow-xl shadow-secondary/15 transition-all ease-out`}
>
	{#if $open}
		{#each items as item (item.value)}
			<li
				class="flex items-center gap-4 rounded-md px-4 py-2 transition-colors duration-200 hover:cursor-pointer hover:bg-secondary/10"
				use:melt={$option(item)}
			>
				{#if item.icon}
					<svelte:component this={item.icon} />
				{/if}
				<span>{item.label}</span>
			</li>
		{/each}
	{/if}
</ul>

<style lang="postcss">
	li[aria-selected='true'] {
		@apply bg-secondary/10;
	}
	li[aria-selected='true']:hover {
		@apply bg-secondary/15;
	}
</style>
