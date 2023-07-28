<script lang="ts">
	import { AppwriteException } from 'appwrite';
	import type { Vote } from '../models/vote';
	import appwriteSdk from '../sdk/appwrite/appwriteSdk';
	import type { DatabaseBase } from '../sdk/databaseBase';
	import { removeOption, type Option, voted } from '../store/pollOptions';
	import { user } from '../store/user';
	import { addNotification } from '../store/notification';

	export let collectionId: string = '';
	export let option: Option = null;
	export let voteOnly = false;
	export let isVoted: boolean = false;
	function deleteOption() {
		removeOption(option.id);
	}

	let database: DatabaseBase = appwriteSdk.Database;

	async function vote() {
		try {
			const vote: Vote = {
				id: $user.id,
				optionId: option.id
			};
			await database.castPoll(collectionId, vote);
			voted.set(true);
		} catch (error) {
			// Check if error is AppwriteException
			if (error instanceof AppwriteException) {
				if (error.code === 409) {
					voted.set(true);
				}
			} else {
				console.error(error);
			}
			addNotification({
				type: 'error',
				message: error
			});
		}
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
