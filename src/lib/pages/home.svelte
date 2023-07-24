<script lang="ts">
	import { pollOptions, type Option } from './../store/pollOptions';
	import Modal from '../components/modal.svelte';

	import Header from '../layout/header.svelte';

	import type SDK from '../sdk/sdk';

	import appwriteSdk from '../sdk/appwrite/appwriteSdk';
	import OptionCard from '../components/optionCard.svelte';

	let options: Option[];

	$: pollOptions.subscribe((value) => {
		options = value;
	});

	let sdk: SDK = appwriteSdk;

	let showModal = false;
</script>

<main class="main-content u-full-screen-height">
	<Header />
	<div class="u-flex-vertical u-main-center u-cross-center u-gap-16">
		<div class="u-flex u-main-center u-cross-center">
			<div class="container">
				<input
					class="u-padding-16 u-padding-inline-end-120"
					type="text"
					placeholder="Enter your Question"
					style="border-radius: 15;"
				/>
			</div>
			<button class="button">Create</button>
		</div>
		<button class="button is-secondary" on:click={() => (showModal = true)}>
			<span class="icon-plus" aria-hidden="true" />
			<span class="text">Add Option</span></button
		>
		<Modal bind:showModal />
	</div>

	<div
		class="grid-box u-margin-32"
		style="--grid-item-size:12.5rem; --grid-item-size-small-screens: 10rem"
	>
		{#each options as option}
			<OptionCard {option} />
		{/each}
	</div>
</main>

<style lang="scss">
	main {
		min-width: 100vw;
	}
</style>
