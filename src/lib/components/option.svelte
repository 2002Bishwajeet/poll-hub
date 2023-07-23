<script lang="ts">
	import type option from '../models/option';
	export let option: option = null;
</script>

<div class=" card u-text-center">
	<button class="is-icon u-position-absolute close-icon">
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
