<script lang="ts">
	import { IconAlertCircle } from '@tabler/icons-svelte';
	import { onDestroy } from 'svelte';
	import FileUploadInput from './_components/file-upload-input.svelte';
	import ResultReport from './_components/result-report.svelte';
	import TrackSleeve from './_components/track-sleeve.svelte';
	import type { WorkerData } from './_lib/types.js';
	import { buildWaveform, fileTypeLabel, getProcessedAudio, type WaveformPeaks } from './_lib/utils.js';
	import AnalysisWorkerAdapter from './_lib/worker-adapter.js';

	let file = $state<File>();
	let info = $state<{ duration: number; channels: number }>();
	let peaks = $state<WaveformPeaks>();
	let result = $state<WorkerData>({});
	let isLoading = $state(false);
	let progress = $state(0);
	let statusMessage = $state('');
	let errorMessage = $state('');

	let adapter: AnalysisWorkerAdapter | undefined;
	let runId = 0;
	let resetTimer: ReturnType<typeof setTimeout> | undefined;
	let copyTimer: ReturnType<typeof setTimeout> | undefined;

	let bitrate = $derived.by(() => {
		if (!file || !info || info.duration <= 0) return undefined;
		if (fileTypeLabel(file) === 'WAV' || fileTypeLabel(file) === 'FLAC') return undefined;
		return Math.round((file.size * 8) / info.duration / 1000);
	});

	function clearTimer() {
		clearTimeout(resetTimer);
		resetTimer = undefined;
	}

	async function analyze(submittedFile: File) {
		const currentRun = ++runId;

		adapter?.kill();
		adapter = undefined;
		clearTimer();

		file = submittedFile;
		info = undefined;
		peaks = undefined;
		result = {};
		errorMessage = '';
		isLoading = true;
		progress = 0.02;
		statusMessage = 'Decoding audio';

		try {
			const processed = await getProcessedAudio(submittedFile);

			// A newer file was selected while this one was decoding.
			if (currentRun !== runId) return;

			info = { duration: processed.duration, channels: processed.channels };
			peaks = buildWaveform(processed.left);
			progress = 0.05;
			statusMessage = 'Starting analysis';

			const worker = new AnalysisWorkerAdapter();
			adapter = worker;

			worker.onUpdate((update) => {
				if (currentRun !== runId) return;

				if (update.status) {
					statusMessage = update.status.checkpoint;
					progress = update.status.progress;
				}
				if (update.data) {
					result = { ...result, ...update.data };
				}
			});

			worker.onError((message) => {
				if (currentRun !== runId) return;
				errorMessage = friendlyError(message);
				isLoading = false;
				progress = 0;
			});

			worker.onFinished(() => {
				if (currentRun !== runId) return;
				isLoading = false;
				resetTimer = setTimeout(() => (progress = 0), 1500);
			});

			worker.invoke({
				left: processed.left,
				right: processed.right
			});
		} catch (error) {
			if (currentRun !== runId) return;
			errorMessage = friendlyError(error);
			isLoading = false;
			progress = 0;
		}
	}

	function friendlyError(error: unknown) {
		const message = error instanceof Error ? error.message : String(error);

		if (/decode|arraybuffer|encoding|unsupported|corrupt/i.test(message)) {
			return 'The file could not be decoded. It may be corrupted or use an audio codec your browser does not support.';
		}

		return message || 'Something went wrong while analyzing this file.';
	}

	function formatPeak(peak: number) {
		if (!Number.isFinite(peak)) return '—';
		return `${peak.toFixed(1)} dBFS`;
	}

	onDestroy(() => {
		runId++;
		adapter?.kill();
		clearTimer();
		clearTimeout(copyTimer);
	});
</script>

<svelte:head>
	<title>Audio analyzer | Elluzion</title>
	<meta name="description" content="Analyze the key, tempo and loudness of an audio file locally in your browser." />
</svelte:head>

<div class="page-wrapper">
	<div class="flex flex-col gap-1">
		<h2>Audio analyzer</h2>
	</div>

	<FileUploadInput
		{isLoading}
		{statusMessage}
		{progress}
		onSubmit={analyze}
		onError={(message) => (errorMessage = message)}
	/>

	{#if errorMessage}
		<div class="flex items-start gap-3 rounded-2xl bg-surface p-4 ring-1 ring-primary/30">
			<IconAlertCircle size={20} class="text-primary" />
			<p class="text-sm">{errorMessage}</p>
		</div>
	{/if}

	{#if file}
		{#key file}
			<TrackSleeve {file} {info} {bitrate} {peaks} />
		{/key}
	{/if}

	{#if result.keyData || result.tempo || result.loudness}
		<div class="flex flex-col gap-3">
			<ResultReport {result} />
		</div>
	{/if}
</div>
