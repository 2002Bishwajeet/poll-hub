<script lang="ts">
	import { insert } from 'svelte/internal';
	import Helper from '../elements/form/helper.svelte';
	import { insertOption } from '../store/pollOptions';

	export let showModal: boolean; // boolean

	let dialog: HTMLDialogElement; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();

	let option: string;
	let error: string;
	let element: HTMLInputElement;

	$: if (option) {
		error = null;
	}

	function handleInvalid(event: Event) {
		event.preventDefault();
		if (element.validity.valueMissing) {
			error = 'This field is required';
			return;
		}
		error = element.validationMessage;
	}

	function addOption() {
		insertOption({
			id: option.toLocaleLowerCase(),
			name: option
		});
		option = '';
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class="modal"
	id="dialog"
>
	<form class="modal-form" method="dialog" on:submit={addOption}>
		<header class="modal-header">
			<div class="u-flex u-main-space-between u-cross-center u-gap-16">
				<h4 class="modal-title heading-level-5">New Option</h4>
				<button class="button is-text is-small is-only-icon" aria-label="Close modal">
					<span class="icon-x" aria-hidden="true" />
				</button>
			</div>
		</header>
		<div class="modal-content u-margin-block-start-12">
			<ul class="form-list">
				<li class="form-item">
					<div class="input-text-wrapper">
						<input
							type="text"
							class="input-text"
							placeholder="option"
							bind:value={option}
							bind:this={element}
							on:invalid={handleInvalid}
						/>
					</div>
				</li>
				{#if error}
					<Helper type="warning">{error}</Helper>
				{/if}
			</ul>
		</div>
		<div class="modal-footer">
			<div class="u-flex u-main-end u-gap-16">
				<button class="button is-secondary" type="submit">
					<span class="text">Create</span>
				</button>
			</div>
		</div>
	</form>
</dialog>

<style lang="scss"></style>
