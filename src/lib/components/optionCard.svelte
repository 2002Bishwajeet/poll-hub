<script lang="ts">
	import { removeOption, type Option, voted } from '../store/pollOptions';

	export let option: Option = null;
	export let voteOnly = false;
	let isVoted :boolean = false;
	function deleteOption() {
		removeOption(option.id);
	}
	function vote() {
		console.log('voted')
		voted.set(true);

	}

	$: voted.subscribe((value) => {
		isVoted = value;
	});


</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class=" card u-text-center" on:click={voteOnly && !isVoted ? vote : null}>
	{#if !voteOnly}
	<button class="is-icon u-position-absolute close-icon" on:click={deleteOption}>
		<span class="icon-x" />
	</button>
	{/if}
	<h5 class="heading-level-5 u-bold u-padding-block-12">{option.name ?? 'Option'}</h5>
</div>

<style lang="scss">
	.close-icon {
		top: 10px;
		right: 10px;
	}
</style>
