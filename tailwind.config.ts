import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		colors: {
			primary: '#976567',
			onPrimary: '#F6F3F3',
			secondary: '#999291',
			onSecondary: '#F6F4F3',
			background: '#F6F4F3',
			onBackground: '#2E2E33',
			surface: '#FFFFFF',
			onSurface: '#2E2E33',
			surfaceVariant: '#EDE7E4',
			onSurfaceVariant: '#2E2E33',
			white: '#FFFFFF',
			black: '#000000'
		}
	},

	plugins: [require('@tailwindcss/typography')]
} as Config;
