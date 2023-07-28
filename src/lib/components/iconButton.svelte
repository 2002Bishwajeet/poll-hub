<script lang="ts">
	export let name: string;
	export let icon: string;
	export let buttonColor: string | null;
	export let onClick: (() => void) | null = null;
</script>

<button
	class="button u-stretch u-main-center is-secondary"
	type="button"
	style="background-color: {buttonColor}; color: hsl(var(--color-neutral-0));"
	on:click={onClick}
>
	<span class={icon} aria-hidden="true" />
	<span class="text"> {name}</span>
</button>
