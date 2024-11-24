import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		colors: {
			primary: '#976567',
			onPrimary: '#F6F3F3',
			secondary: '#907c7c',
			onSecondary: '#F6F4F3',
			background: '#F6F4F3',
			onBackground: '#2E2E33',
			onBackgroundVariant: '#999291',
			surface: '#FFFFFF',
			onSurface: '#2E2E33',
			surfaceVariant: '#EDE7E4',
			onSurfaceVariant: '#2E2E33',
			white: '#FFFFFF',
			black: '#000000'
		},
		fontFamily: {
			sans: ['"Space Grotesk"', 'sans-serif'],
			sans2: ['"Inter"', 'sans-serif'],
			mono: ['"JetBrains Mono"', 'monospace']
		},
		extend: {
			screens: {
				xs: '400px'
			}
		}
	},

	plugins: [require('@tailwindcss/typography')]
} as Config;
