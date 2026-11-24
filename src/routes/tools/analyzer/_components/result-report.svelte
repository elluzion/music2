<script lang="ts">
	import {
		IconArrowsUpDown,
		IconChartBar,
		IconCheck,
		IconCopy,
		IconMetronome,
		IconMusic,
		IconVolume,
		type Icon
	} from '@tabler/icons-svelte';
	import { onDestroy } from 'svelte';
	import type { WorkerData } from '../_lib/types.js';
	import { formatKey } from '../_lib/utils.js';

	interface Props {
		result: WorkerData;
	}

	let { result }: Props = $props();

	interface Metric {
		label: string;
		icon: Icon;
		value: string;
		unit: string;
		copyValue: string;
	}

	const segments = Array.from({ length: 10 });

	let copied = $state('');
	let copyTimer: ReturnType<typeof setTimeout> | undefined;

	let keyName = $derived(result.keyData ? formatKey(result.keyData.key, result.keyData.scale) : '');
	let confidence = $derived(result.keyData ? Math.round(result.keyData.strength * 100) : 0);
	let filledSegments = $derived(Math.max(1, Math.round((confidence / 100) * segments.length)));

	let metrics = $derived.by(() => {
		const items: Metric[] = [];

		if (result.tempo) {
			items.push({
				label: 'Tempo',
				icon: IconMetronome,
				value: `${result.tempo}`,
				unit: 'BPM',
				copyValue: `${result.tempo} BPM`
			});
		}

		if (result.loudness) {
			const peakIsNumber = Number.isFinite(result.loudness.peak);
			const peak = peakIsNumber ? result.loudness.peak.toFixed(1) : '—';

			items.push(
				{
					label: 'Loudness',
					icon: IconVolume,
					value: result.loudness.overall.toFixed(1),
					unit: 'LUFS',
					copyValue: `${result.loudness.overall.toFixed(1)} LUFS`
				},
				{
					label: 'Loudness range',
					icon: IconArrowsUpDown,
					value: result.loudness.range.toFixed(1),
					unit: 'LU',
					copyValue: `${result.loudness.range.toFixed(1)} LU`
				},
				{
					label: 'Sample peak',
					icon: IconChartBar,
					value: peak,
					unit: peakIsNumber ? 'dBFS' : '',
					copyValue: peakIsNumber ? `${peak} dBFS` : peak
				}
			);
		}

		return items;
	});

	async function copy(label: string, value: string) {
		if (copied === label) return;

		try {
			await navigator.clipboard.writeText(value);
			copied = label;
			clearTimeout(copyTimer);
			copyTimer = setTimeout(() => (copied = ''), 2000);
		} catch {
			// Clipboard access can be blocked outside of a secure context.
		}
	}

	onDestroy(() => clearTimeout(copyTimer));
</script>

{#snippet copyButton(label: string, value: string)}
	<button
		type="button"
		class="cursor-pointer rounded-sm p-0.5 text-secondary opacity-40 transition-[color,opacity] duration-200 hover:text-onSurface hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none"
		aria-label="Copy {label}"
		onclick={() => copy(label, value)}
	>
		{#if copied === label}
			<IconCheck size={15} />
		{:else}
			<IconCopy size={15} />
		{/if}
	</button>
{/snippet}

{#snippet metric(item: Metric)}
	{@const MetricIcon = item.icon}
	<div class="rise flex items-center gap-3">
		<div class="flex min-w-0 grow items-center gap-2">
			<MetricIcon size={15} class="shrink-0 text-secondary" />
			<div class="min-w-0">
				<span class="block font-mono text-xs leading-snug font-bold text-secondary">
					{item.label}
				</span>
			</div>
		</div>
		<div class="flex shrink-0 items-baseline gap-1">
			<span class="font-mono text-xl leading-none font-bold tabular-nums">{item.value}</span>
			{#if item.unit}
				<span class="w-[4ch] font-mono text-xs font-bold text-secondary">{item.unit}</span>
			{/if}
		</div>
		{@render copyButton(item.label.toLowerCase(), item.copyValue)}
	</div>
{/snippet}

<section class="flex flex-col rounded-2xl bg-surface p-4" aria-label="Analysis results">
	{#if result.keyData}
		<div class="rise">
			<div class="flex items-center gap-1.5">
				<IconMusic size={15} class="shrink-0 text-secondary" />
				<span class="font-mono text-xs font-bold text-secondary">Key</span>
				<span class="ml-auto font-mono text-xs text-secondary tabular-nums">
					{confidence}% confidence
				</span>
				{@render copyButton('key', keyName)}
			</div>
			<div class="mt-2.5 font-mono text-3xl leading-none font-bold">{keyName}</div>
			<div class="mt-4 flex gap-1.5" aria-hidden="true">
				{#each segments as _, index}
					<span
						class="h-1.5 flex-1 rounded-full transition-colors duration-300 {index < filledSegments
							? 'bg-primary'
							: 'bg-secondary/20'}"
					></span>
				{/each}
			</div>
		</div>
	{/if}

	{#if metrics.length > 0}
		<div class="mt-5 flex flex-col gap-3.5">
			{#each metrics as item (item.label)}
				{@render metric(item)}
			{/each}
		</div>
	{/if}
</section>

<style lang="postcss">
	@reference '../../../../app.css';

	.rise {
		animation: rise 260ms ease-out both;
	}

	@keyframes rise {
		from {
			translate: 0 6px;
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.rise {
			animation: none;
		}
	}
</style>
