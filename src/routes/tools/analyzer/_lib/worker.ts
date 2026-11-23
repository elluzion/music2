import Essentia from 'essentia.js/dist/essentia.js-core.es.js';
import { EssentiaWASM } from 'essentia.js/dist/essentia-wasm.es.js';
import { TARGET_SAMPLE_RATE, type AnalysisInput, type WorkerUpdate } from './types.js';

/**
 * Essentia analysis worker.
 *
 * The heavy lifting (WebAssembly) runs off the main thread so the UI stays
 * responsive while a track is analyzed.
 */

const scope = self as unknown as {
	onmessage: ((event: MessageEvent<AnalysisInput>) => void) | null;
	postMessage(message: WorkerUpdate): void;
};

let analyser: ReturnType<typeof createAnalyser> | undefined;

function createAnalyser() {
	// Instantiating Essentia is expensive, so it is reused between runs.
	return new Essentia(EssentiaWASM);
}

function getAnalyser() {
	analyser ??= createAnalyser();
	return analyser;
}

function post(update: WorkerUpdate) {
	scope.postMessage(update);
}

scope.onmessage = ({ data }: MessageEvent<AnalysisInput>) => {
	try {
		analyse(data);
	} catch (error) {
		post({ error: error instanceof Error ? error.message : String(error) });
	}
};

function analyse({ left, right }: AnalysisInput) {
	const essentia = getAnalyser();

	// Key and tempo: mono signal at 16 kHz
	const mono = toMono(left, right);
	const monoSignal = essentia.arrayToVector(mono);

	try {
		post({ status: { progress: 0.12, checkpoint: 'Calculating key data' } });

		const keyData = essentia.KeyExtractor(
			monoSignal,
			true, // average detuning correction
			4096, // frame size
			4096, // hop size
			12, // HPCP size
			3500, // max frequency
			60, // maximum spectral peaks
			25, // min frequency
			0.2, // pcp threshold
			'bgate', // profile type
			TARGET_SAMPLE_RATE,
			0.0001, // spectral peaks threshold
			440, // tuning frequency
			'cosine', // weight type
			'hann' // window type
		);

		post({
			data: {
				keyData: {
					key: keyData.key,
					scale: keyData.scale,
					strength: keyData.strength
				}
			}
		});

		post({ status: { progress: 0.5, checkpoint: 'Calculating tempo' } });

		const rawTempo = essentia.PercivalBpmEstimator(
			monoSignal,
			1024, // frame size
			2048, // frame size for onset strength signal
			128, // hop size
			128, // hop size for onset strength signal
			210, // max BPM
			50, // min BPM
			TARGET_SAMPLE_RATE
		).bpm;

		const tempo = foldTempo(rawTempo);
		post({
			data: {
				tempo: tempo > 0 ? Math.round(tempo) : undefined,
				tempoRaw: rawTempo > 0 ? Math.round(rawTempo) : undefined
			}
		});
	} finally {
		monoSignal.delete();
	}

	// Loudness: true stereo (dual mono for single-channel files)
	post({ status: { progress: 0.75, checkpoint: 'Measuring loudness' } });

	const leftSignal = essentia.arrayToVector(left);
	const rightSignal = right ? essentia.arrayToVector(right) : leftSignal;

	try {
		const loudness = essentia.LoudnessEBUR128(
			leftSignal,
			rightSignal,
			0.1, // hop size in seconds
			TARGET_SAMPLE_RATE,
			false
		);

		post({
			data: {
				loudness: {
					// A mono file is fed to both channels, which adds 3 dB of
					// acoustic power. Subtract it so mono tracks report the same
					// loudness as a single-channel meter would.
					overall: loudness.integratedLoudness + (right ? 0 : -3.010299956639812),
					range: loudness.loudnessRange,
					peak: samplePeakDb(left, right)
				}
			}
		});

		loudness.momentaryLoudness?.delete?.();
		loudness.shortTermLoudness?.delete?.();
	} finally {
		leftSignal.delete();
		if (rightSignal !== leftSignal) rightSignal.delete();
	}

	post({ status: { progress: 1, checkpoint: 'Finished' } });
}

/** Mixes a stereo signal to mono, matching the original analyzer. */
function toMono(left: Float32Array, right?: Float32Array) {
	if (!right) return left;

	const mono = new Float32Array(left.length);
	for (let i = 0; i < mono.length; i++) {
		mono[i] = 0.5 * (left[i] + right[i]);
	}
	return mono;
}

/**
 * Octave-corrects the tempo estimate into the range listeners usually
 * perceive (70-180 BPM). The original tool doubled everything below 89 BPM,
 * which mislabeled genuinely slow tracks as double-time.
 */
function foldTempo(bpm: number) {
	if (!Number.isFinite(bpm) || bpm <= 0) return 0;

	let value = bpm;
	while (value < 70) value *= 2;
	while (value > 180) value /= 2;
	return value;
}

/** Sample peak across both channels in dBFS. */
function samplePeakDb(left: Float32Array, right?: Float32Array) {
	let peak = 0;

	for (let i = 0; i < left.length; i++) {
		const leftValue = Math.abs(left[i]);
		if (leftValue > peak) peak = leftValue;
	}

	if (right) {
		for (let i = 0; i < right.length; i++) {
			const rightValue = Math.abs(right[i]);
			if (rightValue > peak) peak = rightValue;
		}
	}

	return peak > 0 ? 20 * Math.log10(peak) : Number.NEGATIVE_INFINITY;
}
