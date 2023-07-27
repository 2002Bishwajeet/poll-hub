<script lang="ts">
	import { colors } from './../utils/colors';
	import { pollOptions, type Option } from './../store/pollOptions';
	import Modal from '../components/modal.svelte';
	import Header from '../layout/header.svelte';
	import appwriteSdk from '../sdk/appwrite/appwriteSdk';
	import OptionCard from '../components/optionCard.svelte';
	import type { DatabaseBase } from '../sdk/databaseBase';
	import type { Poll } from '../models/poll';
	import { addNotification } from '../store/notification';
	import { querystring, replace } from 'svelte-spa-router';
	import {Bar} from 'svelte-chartjs'
	import {
    Chart,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from 'chart.js';
	import { user } from '../store/user';
	import type { User } from '../models/userModel.js';


	let options: Option[];
	let question: string;
	let voteOnly : boolean= false;
	let creator: boolean = false;
	export let params = {};
	let currentUser: User = null;


	$: user.subscribe((value) => {
		currentUser = value;
	});

	/* 
	If there are params, then it means the poll has been created,
	two things can happen here:
	It has query params with admin key, which means the user is the admin
	Or it has query params with share key, which means the user is a user
	*/

	/* :id is the collectionId */
	$: collectionId  = params['id'];

	/* queries would be of this type
		q: question
		o: options[],
	*/
	let query = new URLSearchParams($querystring);
	if(query)
	{
	 question = query.get('q');
	 options = query.getAll('o').map((option) => {
		return {
			id: option,
			name: option,
		};
	});
	if(query.has('u'))
	creator = query.get('u') === currentUser.id;
	
	
	pollOptions.set(options);

 Chart.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  );


	}	

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
			const params = new URLSearchParams();
			params.set('q', response.question);
			response.options.forEach((option) => {
				params.append('o', option.id);
			});
			// Adding user id to query params
			// to guess if the user is the creator or not
			user.subscribe((value) => {
				params.set('u', value.id);
			});

			replace(`/home/${response.id}?${params.toString()}`);

		} catch (error) {
			addNotification({
				type: 'error',
				message: error.message
			});
		}
	}

	$: shareButton = collectionId ? true : false;
	$: voteOnly = collectionId ? true : false;

	const data = {
  labels: options.map((option) => option.name),
  datasets: [
    {
      label: '% of Votes',
      data: [12, 19],
      backgroundColor: colors.appwritePink300,
      borderWidth: 2,
    },
  ],
};
	

	let showModal = false;
</script>

<main class="main-content u-full-screen-height">
	<Header  showShareButton={shareButton} showStopButton = {creator} />
	<!-- svelte-ignore empty-block -->
	{#if collectionId}
	<div class= "u-margin-32 h-32   ">
		<Bar {data} options={{ responsive: true, maintainAspectRatio: true}} />
		</div>
 {:else}
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
	{/if}

	<div
		class="grid-box u-margin-32"
		style="--grid-item-size:12.5rem; --grid-item-size-small-screens: 10rem"
	>
		{#each options as option}
			<OptionCard {option} {voteOnly}  />
		{/each}
	</div>

</main>

<style lang="scss">
	main {
		min-width: 100vw;
	}

	.h-32{
		height: 30rem;
	}

</style>
