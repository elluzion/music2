<script lang="ts">
	import Button from '#components/ui/button.svelte';
	import Slider from '#components/ui/slider.svelte';
	import { secondsToString } from '#lib/helpers/misc.js';
	import { IconPlayerPause, IconPlayerPlay } from '@tabler/icons-svelte';
	import { fade, scale } from 'svelte/transition';

	interface Props {
		fileUrl?: string;
		file?: File;
		frame?: boolean;
		/** Playback progress from 0 to 1, bound back to the parent. */
		progress?: number;
	}

	let { fileUrl, file, frame = true, progress = $bindable(0) }: Props = $props();

	let audioItem = $state<HTMLAudioElement>();

	let isPlaying = $state(false);
	let currentTime = $state(0);
	let duration = $state(0);

	// Report the playhead to the parent so siblings, such as a waveform, can
	// follow along with the transport.
	$effect(() => {
		progress = duration > 0 ? Math.min(1, currentTime / duration) : 0;
	});

	/** Object URL for an uploaded file, revoked when the file changes. */
	let objectUrl = $state<string>();

	let source = $derived(file ? objectUrl : fileUrl);

	// `timeupdate` fires about four times a second, so follow the playhead on
	// every animation frame while playing.
	$effect(() => {
		if (!isPlaying) return;

		let frame = 0;
		const tick = () => {
			currentTime = audioItem?.currentTime ?? 0;
			frame = requestAnimationFrame(tick);
		};

		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	});

	$effect(() => {
		if (!file) {
			objectUrl = undefined;
			return;
		}

		const url = URL.createObjectURL(file);
		objectUrl = url;

		return () => URL.revokeObjectURL(url);
	});

	// Whenever the track changes, load the new source and reset the transport so
	// the duration, the slider range and the play state never leak from the
	// previous song.
	$effect(() => {
		void source;

		currentTime = 0;
		duration = 0;
		isPlaying = false;

		if (audioItem) {
			audioItem.load();
		}
	});

	function togglePlay() {
		if (!audioItem) return;

		if (audioItem.paused) {
			audioItem.play();
		} else {
			audioItem.pause();
		}
	}

	function updateTimings() {
		if (!audioItem) return;

		currentTime = audioItem.currentTime;
		duration = Number.isFinite(audioItem.duration) ? audioItem.duration : 0;
	}

	function handleEnded() {
		isPlaying = false;
		currentTime = 0;
	}
</script>

<div
	class="flex w-full items-center rounded-full"
	class:h-14={frame}
	class:bg-surface={frame}
	class:p-2={frame}
	class:pr-6={frame}
>
	{#if duration > 0}
		<div in:fade={{ duration: 50 }} class="flex w-full items-center gap-6">
			<Button variant="primary" size="icon" class="shrink-0" onclick={togglePlay}>
				<span class="grid place-items-center">
					{#key isPlaying}
						<span
							class="col-start-1 row-start-1 flex"
							in:scale={{ duration: 180, start: 0.4, opacity: 0 }}
							out:fade={{ duration: 120 }}
						>
							{#if isPlaying}
								<IconPlayerPause size={20} />
							{:else}
								<IconPlayerPlay size={20} />
							{/if}
						</span>
					{/key}
				</span>
			</Button>
			<span class="w-10 shrink-0 text-center font-mono text-sm font-bold text-secondary tabular-nums">
				{secondsToString(Math.round(currentTime))}
			</span>
			<Slider
				class="grow"
				min={0}
				max={duration}
				step={0.01}
				defaultValue={[0]}
				onchange={(e) => (audioItem!.currentTime = e)}
				bind:value={currentTime}
			/>
			<span class="w-10 shrink-0 text-center font-mono text-sm font-bold text-secondary tabular-nums"
				>{secondsToString(Math.round(duration))}</span
			>
		</div>
	{/if}
</div>
<audio
	preload="metadata"
	class="hidden"
	bind:this={audioItem}
	src={source}
	onloadedmetadata={updateTimings}
	ontimeupdate={updateTimings}
	onplay={() => (isPlaying = true)}
	onpause={() => (isPlaying = false)}
	onended={handleEnded}
	controls
></audio>
