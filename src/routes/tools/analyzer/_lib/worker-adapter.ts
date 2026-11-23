import type { AnalysisInput, WorkerUpdate } from './types.js';

/**
 * Typed wrapper around the analysis worker.
 *
 * The worker is created lazily on the client, because `Worker` does not exist
 * during server-side rendering.
 */
export default class AnalysisWorkerAdapter {
	private worker: Worker;

	private updateCallbacks: ((update: WorkerUpdate) => void)[] = [];
	private errorCallbacks: ((error: string) => void)[] = [];
	private finishedCallbacks: (() => void)[] = [];

	constructor() {
		this.worker = new Worker(new URL('./worker.ts', import.meta.url), {
			type: 'module'
		});

		this.worker.addEventListener('message', (event: MessageEvent<WorkerUpdate>) => {
			const update = event.data;

			if (update.error) {
				this.emitError(update.error);
				this.emitFinished();
				return;
			}

			if (update.data || update.status) {
				this.updateCallbacks.forEach((callback) => callback(update));
			}

			if (update.status?.progress === 1) {
				this.emitFinished();
			}
		});

		this.worker.addEventListener('error', (event) => {
			this.emitError(event.message || 'The analysis worker failed.');
			this.emitFinished();
		});

		this.worker.addEventListener('messageerror', () => {
			this.emitError('The analysis worker could not read the audio data.');
			this.emitFinished();
		});
	}

	/** Starts analyzing. The audio buffers are transferred, not copied. */
	invoke(audio: AnalysisInput) {
		const transfer = [audio.left.buffer];
		if (audio.right) transfer.push(audio.right.buffer);

		this.worker.postMessage(audio, transfer);
	}

	kill() {
		this.worker.terminate();
	}

	onUpdate(callback: (update: WorkerUpdate) => void) {
		this.updateCallbacks.push(callback);
	}

	onError(callback: (error: string) => void) {
		this.errorCallbacks.push(callback);
	}

	onFinished(callback: () => void) {
		this.finishedCallbacks.push(callback);
	}

	private emitError(error: string) {
		this.errorCallbacks.forEach((callback) => callback(error));
	}

	private emitFinished() {
		this.finishedCallbacks.forEach((callback) => callback());
	}
}
