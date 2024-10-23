<script lang="ts">
	import Button from '$components/ui/button.svelte';
	import Slider from '$components/ui/slider.svelte';
	import { secondsToString } from '$lib/helpers/misc';
	import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import { fade } from 'svelte/transition';

	let audioItem: HTMLAudioElement;

	let isPlaying = false;
	let currentTime = 0;
	let duration = 0;

	$: playIcon = isPlaying ? faPause : faPlay;

	export let fileUrl: string;

	function togglePlay() {
		if (audioItem) {
			if (audioItem.paused) {
				audioItem.play();
			} else {
				audioItem.pause();
			}
		}
	}

	function updateTimings() {
		if (audioItem) {
			currentTime = Math.round(audioItem.currentTime);
			duration = Math.round(audioItem.duration);
		}
	}

	export function setMetadata(metadata: MediaMetadata) {
		if (metadata && 'mediaSession' in navigator && navigator.mediaSession) {
			navigator.mediaSession.metadata = metadata;
		}
	}

	onMount(() => {
		if (audioItem) {
			audioItem.addEventListener('timeupdate', updateTimings);

			audioItem.addEventListener('ended', () => {
				if (!isPlaying) return;
				isPlaying = false;
				currentTime = 0;
			});

			audioItem.addEventListener('pause', () => (isPlaying = false));

			audioItem.addEventListener('play', () => (isPlaying = true));

			audioItem.addEventListener('loadedmetadata', updateTimings);

			updateTimings();
		}
	});
</script>

<div class="flex h-14 w-full items-center rounded-full bg-surface p-2 pr-6">
	{#if duration > 0}
		<div in:fade={{ duration: 50 }} class="flex h-14 w-full items-center gap-6">
			<Button variant="primary" size="icon" class="shrink-0" onclick={togglePlay}>
				<Fa icon={playIcon} />
			</Button>
			<span class="w-8 text-center text-sm font-bold text-secondary">
				{secondsToString(currentTime)}
			</span>
			<Slider
				class="grow"
				min={0}
				max={duration}
				step={1}
				defaultValue={[0]}
				onchange={(e) => (audioItem.currentTime = e)}
				bind:value={currentTime}
			/>
			<span class="w-8 text-center text-sm font-bold text-secondary"
				>{secondsToString(duration)}</span
			>
		</div>
	{/if}
</div>
<audio preload="metadata" class="hidden" bind:this={audioItem} src={fileUrl} controls></audio>
