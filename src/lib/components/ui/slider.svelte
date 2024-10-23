<script lang="ts">
	import { createSlider, melt } from '@melt-ui/svelte';
	import { writable } from 'svelte/store';

	interface Props {
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		defaultValue?: number[];
		[key: string]: any;
		onchange?: (num: number) => void;
	}

	let {
		value = $bindable(0),
		min = 0,
		max = 100,
		step = 1,
		defaultValue = [30],
		onchange = undefined,
		...rest
	}: Props = $props();

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
			if (onchange) {
				onchange(value);
			}
		}
	});
</script>

<span use:melt={$root} {...rest} class="relative flex h-[20px] w-[200px] items-center {rest.class}">
	<span class="h-1 w-full bg-onPrimary">
		<span
			use:melt={$range}
			style="width: {(100 * value) / max}%;"
			class="block h-1 w-full rounded-full bg-primary"
		></span>
	</span>

	<span
		use:melt={$thumbs[0]}
		style="position: absolute; translate: -50%; left: calc(100% * {value / max});"
		class="h-4 w-4 rounded-full bg-primary transition-transform focus:scale-125 focus:ring-0"
	></span>
</span>
