<script lang="ts">
	import { IconFileUpload, IconUpload, IconWaveSine } from '@tabler/icons-svelte';
	import { ALLOWED_EXTENSIONS, MAX_FILE_SIZE, formatFileSize, isSupportedAudioFile } from '../_lib/utils.js';

	interface Props {
		isLoading: boolean;
		statusMessage: string;
		/** 0 to 1. */
		progress: number;
		onSubmit: (file: File) => void;
		onError?: (message: string) => void;
	}

	let { isLoading, statusMessage, progress, onSubmit, onError }: Props = $props();

	let input = $state<HTMLInputElement>();
	let isDragging = $state(false);

	const acceptedTypes = ALLOWED_EXTENSIONS.map((extension) => `.${extension}`).join(',');
	const formatLabel = 'MP3 · WAV · FLAC · OGG · M4A';

	function submit(file: File | undefined) {
		if (!file || isLoading) return;

		if (!isSupportedAudioFile(file)) {
			onError?.(`"${file.name}" is not a supported audio file (${formatLabel}).`);
			return;
		}

		if (file.size > MAX_FILE_SIZE) {
			onError?.(`"${file.name}" is larger than ${formatFileSize(MAX_FILE_SIZE)}.`);
			return;
		}

		onSubmit(file);

		// Allow selecting the same file again.
		if (input) input.value = '';
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		isDragging = false;
		submit(event.dataTransfer?.files?.[0]);
	}

	function handleDragLeave(event: DragEvent) {
		if (!event.currentTarget || !(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node)) {
			isDragging = false;
		}
	}
</script>

<div
	class="relative flex h-26 w-full items-center justify-center overflow-hidden rounded-2xl bg-surfaceVariant/40 ring-1 ring-surfaceVariant transition-[background-color,box-shadow] duration-200 ring-inset {isDragging
		? 'bg-surfaceVariant/80 ring-2 ring-primary'
		: 'hover:bg-surfaceVariant/60'}"
	role="group"
	aria-label="Audio file upload"
	ondragover={(event) => {
		event.preventDefault();
		if (!isLoading) isDragging = true;
	}}
	ondragleave={handleDragLeave}
	ondrop={handleDrop}
>
	<!-- Progress fill -->
	<div
		class="pointer-events-none absolute inset-y-0 left-0 bg-primary/15 transition-[width] duration-300 ease-out"
		style="width: {Math.min(100, Math.max(0, progress * 100))}%"
		aria-hidden="true"
	></div>

	<button
		type="button"
		class="relative flex h-full w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-0 bg-transparent px-6 text-center focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none focus-visible:ring-inset disabled:cursor-progress"
		disabled={isLoading}
		onclick={() => input?.click()}
	>
		<span class="flex items-center gap-2 font-medium" aria-live="polite">
			{#if isLoading}
				<IconWaveSine size={24} class="animate-pulse" />
			{:else if isDragging}
				<IconFileUpload size={24} />
			{:else}
				<IconUpload size={24} />
			{/if}
			<span>
				{isLoading ? statusMessage || 'Analyzing' : 'Drop an audio file or click to browse'}
			</span>
		</span>
		<span class="font-mono text-xs text-secondary">
			{isLoading ? `${Math.round(progress * 100)}%` : formatLabel}
		</span>
	</button>

	<input
		bind:this={input}
		id="audio-file-upload"
		type="file"
		accept={acceptedTypes}
		class="sr-only"
		disabled={isLoading}
		onchange={(event) => submit(event.currentTarget.files?.[0])}
	/>
</div>
