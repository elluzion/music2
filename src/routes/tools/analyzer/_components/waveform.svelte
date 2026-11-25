<script lang="ts">
	interface Props {
		upper: number[];
		lower: number[];
		/** Describes the drawing for assistive technology. */
		label: string;
		/** Playback progress from 0 to 1; everything before it is the played part. */
		progress?: number;
	}

	let { upper, lower, label, progress = 0 }: Props = $props();

	const HEIGHT = 96;
	const GAP = 2;

	let width = $state(0);
	let played = $derived(Math.min(1, Math.max(0, progress)));
	const uid = $props.id();
	const gradientId = `wave-progress-${uid}`;

	let count = $derived(upper.length);
	// Fractional widths keep every bar and every gap identical; laying the bars
	// out as flex items made the browser snap each one to a different pixel.
	let barWidth = $derived(count ? Math.max(1, (width - (count - 1) * GAP) / count) : 0);
	let step = $derived(barWidth + GAP);

	function heightOf(value: number) {
		return Math.max(2, Math.min(1, value) * (HEIGHT / 2 - 1));
	}
</script>

<div class="wave" bind:clientWidth={width} role="img" aria-label={label}>
	<span class="axis" aria-hidden="true"></span>
	{#if width > 0}
		<svg class="plot" {width} height={HEIGHT} aria-hidden="true">
			<defs>
				<linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={width} y2="0">
					<stop class="played" offset={played} />
					<stop class="unplayed" offset={played} />
				</linearGradient>
			</defs>
			<g fill={`url(#${gradientId})`}>
				{#each upper as value, i}
					{@const height = heightOf(value)}
					<rect x={i * step} y={HEIGHT / 2 - 0.5 - height} width={barWidth} {height} rx={barWidth / 2} />
				{/each}
				{#each lower as value, i}
					{@const height = heightOf(value)}
					<rect x={i * step} y={HEIGHT / 2 + 0.5} width={barWidth} {height} rx={barWidth / 2} />
				{/each}
			</g>
		</svg>
	{/if}
</div>

<style lang="postcss">
	@reference '../../../../app.css';

	.wave {
		@apply relative h-24 overflow-hidden;
		animation: reveal 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
	}

	.axis {
		@apply pointer-events-none absolute inset-x-0 top-1/2 h-px bg-secondary/15;
	}

	.plot {
		@apply block;
	}

	.plot stop.played {
		stop-color: var(--color-primary);
	}

	.plot stop.unplayed {
		stop-color: --alpha(var(--color-primary) / 55%);
	}

	@keyframes reveal {
		from {
			clip-path: inset(0 100% 0 0);
			opacity: 0.4;
		}

		to {
			clip-path: inset(0 0 0 0);
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.wave {
			animation: none;
		}
	}
</style>
