<script lang="ts">
	import { ChevronDown } from '@lucide/svelte';
	import { createSelect, melt } from '@melt-ui/svelte';
	import { type Component } from 'svelte';

	interface Props {
		items: { label: string; value: any; icon?: Component }[];
		value: any;
		onchange?: (value: any) => void;
	}

	let { items, value = $bindable(), onchange }: Props = $props();

	const getSelectedItem = () => items.find((item) => item.value === value) ?? items[0];

	const {
		elements: { trigger, menu, label, option },
		states: { open, selected, selectedLabel }
	} = createSelect({
		defaultSelected: getSelectedItem(),
		preventScroll: false,
		forceVisible: true,
		portal: null
	});

	$effect(() => {
		const match = getSelectedItem();
		if ($selected !== match) {
			$selected = match;
		}
	});

	$effect(() => {
		return selected.subscribe((newValue) => {
			// Ignore the empty value melt can emit before a selection exists, otherwise
			// it would overwrite the persisted value with `undefined` on load.
			if (!newValue) return;
			value = newValue.value;
			if (onchange) onchange(value);
		});
	});
</script>

<div use:melt={$trigger} class="flex cursor-pointer items-center gap-4 py-2 text-secondary">
	<ChevronDown class={$open ? 'rotate-180 transition-transform' : 'transition-transform'} />
	<span use:melt={$label} class="user-select-none font-medium">
		{$selectedLabel || 'Nothing selected'}
	</span>
</div>

<ul
	use:melt={$menu}
	aria-hidden={!$open}
	class="absolute flex flex-col gap-1 rounded-2xl bg-surface p-2 shadow-xl shadow-secondary/15 transition-all duration-150 ease-out dark:shadow-black/50"
	class:pointer-events-none={!$open}
	class:opacity-0={!$open}
	class:-translate-y-2={!$open}
>
	{#each items as item (item.value)}
		<li
			class="flex items-center gap-4 rounded-md px-4 py-2 transition-colors duration-200 hover:cursor-pointer hover:bg-secondary/10"
			use:melt={$option(item)}
		>
			{#if item.icon}
				<item.icon />
			{/if}
			<span class="font-medium">{item.label}</span>
		</li>
	{/each}
</ul>

<style lang="postcss">
	@reference '../../app.css';

	li[aria-selected='true'] {
		@apply bg-secondary/10;
	}
	li[aria-selected='true']:hover {
		@apply bg-secondary/15;
	}
</style>
