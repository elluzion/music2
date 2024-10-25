<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import BackButton from '$components/back-button.svelte';
	import Lenis from 'lenis';
	import { onMount } from 'svelte';
	import '../app.css';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document
				.startViewTransition(async () => {
					const isBackNav = navigation.delta && navigation.delta < 0;
					document.querySelector('html')?.classList.add(isBackNav ? 'back' : 'forward');

					resolve();
					await navigation.complete;
				})
				.finished.then(() => {
					document.querySelector('html')?.classList.remove('forward', 'back');
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

{#if $page.url.pathname !== '/'}
	<BackButton />
{/if}
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

	@keyframes slide-from-left {
		from {
			transform: translateX(-30px);
		}
	}

	@keyframes slide-to-right {
		to {
			transform: translateX(30px);
		}
	}

	:root.forward::view-transition-old(root) {
		animation:
			90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
	}

	:root.forward::view-transition-new(root) {
		animation:
			210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
	}

	:root.back::view-transition-old(root) {
		animation:
			90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-right;
	}

	:root.back::view-transition-new(root) {
		animation:
			210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-left;
	}
</style>
