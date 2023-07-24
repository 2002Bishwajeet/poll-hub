<script lang="ts">
	import Avatar from './avatar.svelte';

	export let name: string;
	export let size: number;
	export let url: string | URL;

	$: src = url instanceof URL ? url.toString() : url;
</script>

<Avatar {name} {size} {src} />
