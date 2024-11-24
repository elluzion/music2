/**
 * Concatenates an array of strings into a single string, separated by a specified separator.
 *
 * @param {string[]} list - The array of strings to join.
 * @param {string} [separator=", "] - The separator to use between strings.
 * @returns {string} The joined string.
 */
export const joinList = (list: string[], separator: string = ', '): string => list.join(separator);

/**
 * Extract the domain from a given URL.
 *
 * @param {string} url
 * The URL to extract the domain from.
 *
 * @returns {string | undefined}
 * The domain, or undefined if the URL is invalid.
 */
export const extractDomain = (url: string): string | undefined => {
	try {
		// Create a URL object
		const urlObject = new URL(url);

		// Extract the hostname
		let domain = urlObject.hostname;

		// Remove 'www.' if present
		domain = domain.replace(/^www\./, '');

		return domain;
	} catch (e) {
		// The URL is invalid
		console.error(e);
		return undefined;
	}
};
