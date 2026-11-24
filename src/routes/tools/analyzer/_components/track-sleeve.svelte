<script lang="ts">
	import Badge from '#components/ui/badge.svelte';
	import type { WaveformPeaks } from '../_lib/utils.js';
	import { fileTypeLabel, formatChannels, formatDuration, formatFileSize } from '../_lib/utils.js';
	import Waveform from './waveform.svelte';

	interface Props {
		file: File;
		info?: { duration: number; channels: number };
		bitrate?: number;
		peaks?: WaveformPeaks;
	}

	let { file, info, bitrate, peaks }: Props = $props();
</script>

<section class="flex flex-col overflow-hidden rounded-2xl bg-surface p-4" aria-label="Selected file">
	<div class="flex items-center gap-2.5">
		<Badge variant="surfaceVariant">{fileTypeLabel(file)}</Badge>
		<span class="truncate font-mono text-sm font-semibold" title={file.name}>{file.name}</span>
	</div>

	<div class="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-secondary tabular-nums">
		{#if info}
			<span>{formatDuration(info.duration)}</span>
			<span>{formatChannels(info.channels)}</span>
		{/if}
		<span>{formatFileSize(file.size)}</span>
		{#if bitrate}
			<span>~{bitrate} kbps</span>
		{/if}
	</div>

	{#if peaks}
		<div class="mt-4 overflow-hidden">
			<Waveform upper={peaks.upper} lower={peaks.lower} label="Waveform of {file.name}" />
		</div>
	{/if}
</section>
