declare module 'essentia.js/dist/essentia-wasm.es.js' {
	export const EssentiaWASM: unknown;
}

declare module 'essentia.js/dist/essentia.js-core.es.js' {
	export interface EssentiaVector {
		delete(): void;
	}

	export interface KeyExtractorResult {
		key: string;
		scale: string;
		strength: number;
	}

	export interface BpmEstimate {
		bpm: number;
	}

	export interface LoudnessResult {
		integratedLoudness: number;
		loudnessRange: number;
		momentaryLoudness?: { delete?: () => void };
		shortTermLoudness?: { delete?: () => void };
	}

	export default class Essentia {
		constructor(wasm: unknown, isDebug?: boolean);

		arrayToVector(input: Float32Array): EssentiaVector;

		KeyExtractor(
			audio: EssentiaVector,
			averageDetuningCorrection?: boolean,
			frameSize?: number,
			hopSize?: number,
			hpcpSize?: number,
			maxFrequency?: number,
			maximumSpectralPeaks?: number,
			minFrequency?: number,
			pcpThreshold?: number,
			profileType?: string,
			sampleRate?: number,
			spectralPeaksThreshold?: number,
			tuningFrequency?: number,
			weightType?: string,
			windowType?: string
		): KeyExtractorResult;

		PercivalBpmEstimator(
			signal: EssentiaVector,
			frameSize?: number,
			frameSizeOSS?: number,
			hopSize?: number,
			hopSizeOSS?: number,
			maxBPM?: number,
			minBPM?: number,
			sampleRate?: number
		): BpmEstimate;

		LoudnessEBUR128(
			leftSignal: EssentiaVector,
			rightSignal: EssentiaVector,
			hopSize?: number,
			sampleRate?: number,
			startAtZero?: boolean
		): LoudnessResult;
	}
}
