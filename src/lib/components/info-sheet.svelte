<script lang="ts">
	import Button from '#components/ui/button.svelte';
	import { IconChevronUp } from '@tabler/icons-svelte';
	import { onDestroy, onMount } from 'svelte';
	import Overlay from './ui/overlay.svelte';
	interface Props {
		children?: import('svelte').Snippet;
		preview?: import('svelte').Snippet;
	}

	let { children, preview }: Props = $props();

	let isMounted = $state(false);
	let isExpanded = $state(false);
	let previewContent = $state<HTMLDivElement>();
	let content = $state<HTMLDivElement>();

	let previewWidth = $state(0);
	let expandedHeight = $state(0);

	let expandedClass = $derived(isExpanded ? 'expanded' : '');

	//#region Public functions
	export function toggleShow() {
		updateContentHeight();
		isExpanded = !isExpanded;
	}
	//#endregion

	//#region Private functions
	const previewContentWidth = () => {
		return previewContent?.offsetWidth || 0;
	};

	const expandedContentHeight = () => {
		return content?.offsetHeight || 0;
	};

	function updatePreviewWidth() {
		previewWidth =
			previewContentWidth() /* Preview */ +
			40 /* Expand Button width */ +
			24 /* PaddingLeft */ +
			8 /* PaddingRight */ +
			16; /* Gap */
	}

	function updateContentHeight() {
		expandedHeight = expandedContentHeight() /* Expanded Content */ + 8 /* PaddingBottom */ + 8; /* PaddingTop */
	}
	//#endregion

	//#region Hook
	onMount(() => {
		// Reserve space below the footer so the floating sheet never covers it.
		document.body.classList.add('has-info-sheet');
		updatePreviewWidth();

		// Update content height on resize
		window.onresize = updateContentHeight;

		// If component has been mounted, fade the container in
		isMounted = true;
	});

	onDestroy(() => {
		if (typeof document === 'undefined') return;
		document.body.classList.remove('has-info-sheet');
	});
	//#endregion
</script>

<Overlay>
	<!-- Info Sheet Container -->
	<div id="infoSheetContainer" class={isMounted ? 'opacity-100' : 'opacity-0'}>
		<!-- Info Sheet -->
		<div
			id="infoSheet"
			style="
      {isExpanded ? '' : `width: ${previewWidth}px;`}
      {isExpanded ? `height: ${expandedHeight}px` : ''};
      transition-delay: {isExpanded ? 0 : 150}ms"
			class={expandedClass}
		>
			<!-- Content -->
			<div
				id="content"
				bind:this={content}
				style="opacity: {isExpanded ? 1 : 0}; transition-delay: {!isExpanded ? 0 : 150}ms;"
				class={expandedClass}
			>
				{@render children?.()}
			</div>
			<!-- Preview -->
			<div id="preview" class={expandedClass}>
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					id="previewContent"
					style="transition-delay: {isExpanded ? 0 : 150}ms;"
					class={expandedClass}
					bind:this={previewContent}
					onclick={() => {
						if (!isExpanded) toggleShow();
					}}
				>
					{@render preview?.()}
				</div>
				<Button size="icon" class="z-10 flex cursor-pointer items-center justify-center" onclick={toggleShow}>
					<IconChevronUp class="transition-transform {isExpanded && 'rotate-180'} duration-300" />
				</Button>
			</div>
		</div>
	</div>
</Overlay>

<style lang="postcss">
	@reference '../../app.css';

	/* Info Sheet */

	#infoSheetContainer {
		@apply pointer-events-none fixed inset-0 z-40 flex h-dvh w-full items-end justify-center overflow-hidden p-4 transition-opacity delay-200 xs:p-6;
	}
	#infoSheet {
		@apply glass pointer-events-auto flex h-14 items-end overflow-hidden rounded-[28px] border border-outline p-2 shadow-xl shadow-secondary/15 transition-all duration-300 dark:shadow-black/50;

		&.expanded {
			@apply w-full md:w-125;
		}
	}

	#preview {
		@apply flex w-full items-center gap-4 pl-4;

		&.expanded {
			@apply justify-end;
		}
	}

	#previewContent {
		@apply grow blur-none transition-all duration-200 select-none;

		&.expanded {
			@apply translate-y-5 opacity-0 blur-md;
		}
	}

	#content {
		@apply pointer-events-none absolute flex h-min flex-col gap-2 p-4 transition-opacity duration-300 select-none;
		@apply w-[calc(100%-32px-16px)] xs:w-[calc(100%-48px-16px)] md:w-121;

		&.expanded {
			@apply pointer-events-auto select-auto;
		}
	}
</style>
