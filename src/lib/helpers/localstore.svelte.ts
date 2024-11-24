import { browser } from '$app/environment';

class StoredState<T> {
	value = $state<T>() as T;
	key = '';

	constructor(key: string, value: T) {
		this.key = key;
		this.value = value;

		if (browser) {
			const item = localStorage.getItem(key);
			if (item) this.value = this.deserialize(item);
		}

		$effect(() => {
			localStorage.setItem(this.key, this.serialize(this.value));
		});
	}

	serialize(value: T): string {
		return JSON.stringify(value);
	}

	deserialize(item: string): T {
		return JSON.parse(item);
	}
}

/**
 * Creates a reactive state that persists to local storage.
 * @param key The key to store in local storage.
 * @param value The initial value of the state.
 * @returns A reactive state.
 */
export function storedState<T>(key: string, value: T) {
	return new StoredState(key, value);
}
