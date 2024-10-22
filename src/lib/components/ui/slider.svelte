<script lang="ts">
	import { createSlider, melt } from '@melt-ui/svelte';
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';

	export let value: number = 0;
	export let min: number = 0;
	export let max: number = 100;
	export let step: number = 1;
	export let defaultValue: number[] = [30];

	const dispatch = createEventDispatcher();

	const {
		elements: { root, range, thumbs },
		states: { value: vv }
	} = createSlider({
		defaultValue: defaultValue,
		min: min,
		max: max,
		step: step,
		value: writable<number[]>([value])
	});

	vv.subscribe((newValue) => {
		if (newValue) {
			value = newValue[0];
			dispatch('change', value);
		}
	});
</script>

<span
	use:melt={$root}
	{...$$restProps}
	class="relative flex h-[20px] w-[200px] items-center {$$restProps.class}"
>
	<span class="h-1 w-full bg-onPrimary">
		<span
			use:melt={$range}
			style="width: {(100 * value) / max}%;"
			class="block h-1 w-full rounded-full bg-primary"
		/>
	</span>

	<span
		use:melt={$thumbs[0]}
		style="position: absolute; translate: -50%; left: calc(100% * {value / max});"
		class="h-4 w-4 rounded-full bg-primary transition-transform focus:scale-125 focus:ring-0"
	/>
</span>
