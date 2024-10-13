<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import Lenis from 'lenis';
	import { onMount } from 'svelte';
	import '../app.css';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	onMount(() => {
		// Lenis scroll
		const lenis = new Lenis({
			duration: 0.6,
			easing: (x) => 1 - Math.pow(1 - x, 5)
		});

		function raf(time: DOMHighResTimeStamp) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
	});
</script>

<div id="pageWrapper">
	<slot></slot>
</div>

<style lang="postcss">
	#pageWrapper {
		@apply min-h-dvh w-full px-4;
	}

	@media (min-width: 600px) {
		#pageWrapper {
			@apply ml-[50vw] max-w-[600px] -translate-x-1/2 px-0;
		}
	}

	/*
		ANIMATION
	*/
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	@keyframes slide-from-right {
		from {
			transform: translateX(30px);
		}
	}

	@keyframes slide-to-left {
		to {
			transform: translateX(-30px);
		}
	}

	:root::view-transition-old(root) {
		animation:
			90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
	}

	:root::view-transition-new(root) {
		animation:
			210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
	}
</style>
