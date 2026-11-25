<script lang="ts">
	function toggleTheme() {
		const root = document.documentElement;
		const isDark = root.classList.toggle('dark');

		try {
			localStorage.setItem('theme', isDark ? 'dark' : 'light');
		} catch {
			// Storage can be unavailable (private mode). The class alone still works.
		}
	}
</script>

<button type="button" class="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark mode" onclick={toggleTheme}>
	<span class="thumb"></span>
	<span class="option option-light">light</span>
	<span class="option option-dark">dark</span>
</button>

<style lang="postcss">
	@reference '../../app.css';

	.theme-toggle {
		@apply relative inline-flex shrink-0 cursor-pointer items-center rounded-full border border-secondary/25 p-0.5 align-middle select-none;
		@apply font-mono text-[10px] leading-none font-bold;
		@apply transition-colors duration-300;
		@apply focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none;
	}

	.theme-toggle:hover {
		@apply border-secondary/60;
	}

	.option {
		@apply relative z-10 flex h-3.5 w-10 items-center justify-center text-secondary;
		@apply transition-colors duration-300;
	}

	.thumb {
		@apply absolute top-0.5 left-0.5 h-3.5 w-10 rounded-full bg-secondary;
		@apply transition-transform duration-300 ease-out;
	}

	:global(html:not(.dark)) .option-light,
	:global(html.dark) .option-dark {
		color: var(--color-background);
	}

	:global(html.dark) .thumb {
		transform: translateX(40px);
	}
</style>
