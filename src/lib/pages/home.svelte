<script lang="ts">
	import { pollOptions, type Option } from './../store/pollOptions';
	import Modal from '../components/modal.svelte';
	import Header from '../layout/header.svelte';
	import appwriteSdk from '../sdk/appwrite/appwriteSdk';
	import OptionCard from '../components/optionCard.svelte';
	import type { DatabaseBase } from '../sdk/databaseBase';
	import type { Poll } from '../models/poll';
	import { addNotification } from '../store/notification';

	let options: Option[];
	let question: string;

	$: pollOptions.subscribe((value) => {
		options = value;
	});

	let database: DatabaseBase = appwriteSdk.Database;

	async function createPoll() {
		if (!question || !options) {
			addNotification({
				type: 'error',
				message: 'Please enter a question and at least one option'
			});
		}
		let poll: Poll = {
			id: '',
			question: question,
			options: options
		};
		try {
			const response = await database.createPoll(poll);
		} catch (error) {
			addNotification({
				type: 'error',
				message: error.message
			});
		}
	}

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
					bind:value={question}
				/>
			</div>
			<button class="button" on:click={createPoll}>Create</button>
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
