import { TARGET_SAMPLE_RATE } from './types.js';

/** Formats the browser can usually decode on all platforms. */
export const ALLOWED_EXTENSIONS = ['mp3', 'wav', 'flac', 'ogg', 'oga', 'opus', 'm4a', 'aac'] as const;

/** Files above this size are rejected to avoid exhausting memory while decoding. */
export const MAX_FILE_SIZE = 100 * 1024 * 1024;

export type ProcessedAudio = {
	left: Float32Array;
	right?: Float32Array;
	channels: number;
	duration: number;
	sampleRate: number;
};

/**
 * Decodes an audio file and resamples it to {@link TARGET_SAMPLE_RATE} in one
 * step. `decodeAudioData` on a 16 kHz `OfflineAudioContext` uses the browser's
 * resampler (including its anti-aliasing filter), which gives more reliable
 * key/tempo/loudness values than naive sample averaging.
 */
export async function getProcessedAudio(file: File): Promise<ProcessedAudio> {
	const arrayBuffer = await file.arrayBuffer();
	const context = new OfflineAudioContext(1, 1, TARGET_SAMPLE_RATE);
	const audioBuffer = await context.decodeAudioData(arrayBuffer);

	const channels = audioBuffer.numberOfChannels;
	const left = copyChannel(audioBuffer.getChannelData(0));
	// Only the first two channels are analyzed, like the original tool.
	const right = channels > 1 ? copyChannel(audioBuffer.getChannelData(1)) : undefined;

	return {
		left,
		right,
		channels,
		duration: audioBuffer.duration,
		sampleRate: audioBuffer.sampleRate
	};
}

/**
 * `getChannelData` returns a view into the AudioBuffer. Copying it lets the
 * buffers be transferred to the worker without detaching the AudioBuffer.
 */
function copyChannel(channel: Float32Array) {
	return new Float32Array(channel);
}

export type WaveformPeaks = {
	/** Peak magnitudes above the centre line, 0 to 1. */
	upper: number[];
	/** Peak magnitudes below the centre line, 0 to 1. */
	lower: number[];
};

/**
 * Reduces the decoded signal to one min/max pair per column so the page can
 * draw the track's actual shape. Peaks are normalised against the loudest
 * sample in the file.
 */
export function buildWaveform(samples: Float32Array, bins = 96): WaveformPeaks {
	const upper = new Array<number>(bins).fill(0);
	const lower = new Array<number>(bins).fill(0);
	const binSize = samples.length / bins;
	let peak = 0;

	for (let bin = 0; bin < bins; bin++) {
		const start = Math.floor(bin * binSize);
		const end = Math.min(samples.length, Math.floor((bin + 1) * binSize));
		// A cap on samples per bin keeps very long files cheap to scan.
		const stride = Math.max(1, Math.floor((end - start) / 256));

		for (let i = start; i < end; i += stride) {
			const value = samples[i];
			if (value > upper[bin]) upper[bin] = value;
			if (value < -lower[bin]) lower[bin] = -value;
		}

		peak = Math.max(peak, upper[bin], lower[bin]);
	}

	if (peak <= 0) return { upper, lower };

	// A mild power curve keeps quiet passages visible without inventing peaks.
	const amplify = (value: number) => Math.pow(value / peak, 0.8);
	return { upper: upper.map(amplify), lower: lower.map(amplify) };
}

export function getFileExtension(fileName: string) {
	return fileName.split('.').pop()?.toLowerCase() ?? '';
}

export function isSupportedAudioFile(file: File) {
	const extension = getFileExtension(file.name);
	return (ALLOWED_EXTENSIONS as readonly string[]).includes(extension);
}

export function fileTypeLabel(file: File) {
	const extension = getFileExtension(file.name);
	return extension ? extension.toUpperCase() : file.type || 'Audio';
}

export function formatDuration(seconds: number) {
	if (!Number.isFinite(seconds) || seconds <= 0) return '—';

	const rounded = Math.round(seconds);
	const hours = Math.floor(rounded / 3600);
	const minutes = Math.floor((rounded % 3600) / 60);
	const remainingSeconds = rounded % 60;

	if (hours > 0) {
		return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
	}

	return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function formatFileSize(bytes: number) {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatChannels(channels: number) {
	if (channels === 1) return 'Mono';
	if (channels === 2) return 'Stereo';
	return `${channels} channels`;
}

export function formatKey(key: string, scale: string) {
	if (!key) return 'Unknown';
	const scaleLabel = scale ? scale.charAt(0).toUpperCase() + scale.slice(1) : '';
	return `${key} ${scaleLabel}`.trim();
}
