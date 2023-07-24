<script lang="ts">
	import { removeOption, type Option } from '../store/pollOptions';

	export let option: Option = null;
	function deleteOption() {
		removeOption(option.id);
	}
</script>

<div class=" card u-text-center">
	<button class="is-icon u-position-absolute close-icon" on:click={deleteOption}>
		<span class="icon-x" />
	</button>
	<h5 class="heading-level-5 u-bold u-padding-block-12">{option.name ?? 'Option'}</h5>
</div>

<style lang="scss">
	.close-icon {
		top: 10px;
		right: 10px;
	}
</style>
