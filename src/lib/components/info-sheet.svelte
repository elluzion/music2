<script lang="ts">
	import Button from '$components/ui/button.svelte';
	import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import Overlay from './overlay.svelte';
	// import MaterialSymbol from './material-symbol.svelte';

	let isMounted = false;
	let isExpanded = false;
	let previewContent: HTMLDivElement;
	let content: HTMLDivElement;

	let previewWidth = 0;
	let expandedHeight = 0;

	$: expandedClass = isExpanded ? 'expanded' : '';

	//#region Public functions
	export function toggleShow() {
		updateContentHeight();
		isExpanded = !isExpanded;
	}
	//#endregion

	//#region Private functions
	const previewContentWidth = () => {
		try {
			return previewContent.offsetWidth;
		} catch (e) {
			return 0;
		}
	};

	const expandedContentHeight = () => {
		try {
			return content.offsetHeight;
		} catch (e) {
			return 0;
		}
	};

	function updatePreviewWidth() {
		previewWidth =
			previewContentWidth() /* Preview */ +
			40 /* Expand Button width */ +
			24 /* PaddingLeft */ +
			8 /* PaddingRight */ +
			16 /* Gap */;
	}

	function updateContentHeight() {
		expandedHeight =
			expandedContentHeight() /* Expanded Content */ + 8 /* PaddingBottom */ + 8; /* PaddingTop */
	}
	//#endregion

	//#region Hook
	onMount(() => {
		updatePreviewWidth();

		// Update content height on resize
		window.onresize = updateContentHeight;

		// If component has been mounted, fade the container in
		isMounted = true;
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
				<slot />
			</div>
			<!-- Preview -->
			<div id="preview" class={expandedClass}>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					id="previewContent"
					style="transition-delay: {isExpanded ? 0 : 150}ms;"
					class={expandedClass}
					bind:this={previewContent}
					on:click={() => {
						if (!isExpanded) toggleShow();
					}}
				>
					<slot name="preview" />
				</div>
				<Button size="icon" class="z-10 flex items-center justify-center" on:click={toggleShow}>
					<Fa
						icon={faChevronUp}
						class="transition-transform {isExpanded && 'rotate-180'} duration-300"
					/>
				</Button>
			</div>
		</div>
	</div>
</Overlay>

<style lang="postcss">
	/* Info Sheet */

	#infoSheetContainer {
		@apply xs:p-6 pointer-events-none fixed inset-0 z-40 flex h-dvh w-full items-end justify-center overflow-hidden p-4 transition-opacity delay-200;
	}
	#infoSheet {
		@apply pointer-events-auto flex h-14 items-end overflow-hidden rounded-[28px] bg-surface p-2 shadow-xl shadow-secondary/15 transition-all duration-300;

		&.expanded {
			@apply w-full md:w-[500px];
		}
	}

	#preview {
		@apply flex w-full items-center gap-4 pl-4;

		&.expanded {
			@apply justify-end;
		}
	}

	#previewContent {
		@apply grow select-none blur-0 transition-all duration-200;

		&.expanded {
			@apply translate-y-5 opacity-0 blur-md;
		}
	}

	#content {
		@apply pointer-events-none absolute flex h-min select-none flex-col gap-2 p-4 transition-opacity duration-300;
		@apply xs:w-[calc(100%-48px-16px)] w-[calc(100%-32px-16px)] md:w-[calc(500px-16px)];

		&.expanded {
			@apply pointer-events-auto select-auto;
		}
	}
</style>
