<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	onMount(() => {
		window.location.href = data?.URL || '/';
	});
</script>

<svelte:head>
	<title>{data?.Caption}</title>
	<meta name="description" content={data?.Caption} />

	<meta name="twitter:card" content={data?.Card} />
	<meta name="twitter:title" content={data?.Caption} />
	<meta name="twitter:image" content={data?.ImageURL} />

	<meta name="twitter:player:width" content={data?.Width} />
	<meta name="twitter:player:height" content={data?.Height} />
	<meta name="twitter:player:stream" content={data?.VideoURL} />
	<meta name="twitter:player:stream:content_type" content="video/mp4" />

	<meta property="og:site_name" content="Instagram" />
	<meta property="og:url" content={data?.URL} />
	<meta property="og:title" content={data?.Caption} />
	<meta property="og:description" content={data?.Caption} />
	<meta property="og:image" content={data?.ImageURL} />
	<meta property="og:video" content={data?.VideoURL} />
	<meta property="og:video:secure_url" content={data?.VideoURL} />
	<meta property="og:video:type" content="video/mp4" />
	<meta property="og:video:width" content={data?.Width} />
	<meta property="og:video:height" content={data?.Height} />
</svelte:head>
