/**
 * Audio data sent from the page to the analysis worker.
 * All channels are already downsampled to {@link TARGET_SAMPLE_RATE}.
 */
export type AnalysisInput = {
	left: Float32Array;
	/** Missing for mono files. */
	right?: Float32Array;
};

/** Sample rate the key/tempo algorithms are tuned for. */
export const TARGET_SAMPLE_RATE = 16000;

export type KeyData = {
	key: string;
	scale: string;
	/** How well the extracted key fits, between 0 and 1. */
	strength: number;
};

export type LoudnessData = {
	/** Integrated loudness in LUFS. */
	overall: number;
	/** Loudness range in LU. */
	range: number;
	/** Sample peak in dBFS. */
	peak: number;
};

export type WorkerData = {
	keyData?: KeyData;
	/** Tempo used for display (the raw estimate may have been octave-corrected). */
	tempo?: number;
	/** Unmodified tempo estimate of the algorithm. */
	tempoRaw?: number;
	loudness?: LoudnessData;
};

export type WorkerStatus = {
	/** 0 to 1. */
	progress: number;
	checkpoint: string;
};

export type WorkerUpdate = {
	data?: WorkerData;
	status?: WorkerStatus;
	error?: string;
};
