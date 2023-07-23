<script lang="ts">
	import { slide } from 'svelte/transition';
	import logo from '../../assets/poll-hub-transparent-large.png';
	import DropListItem from '../components/dropListItem.svelte';
	import AvatarInitials from '../components/avatarInitials.svelte';
	let showDropdown = false;
	let droplistElement: HTMLDivElement;
	 function onBlur(event: MouseEvent) {
        if (
            showDropdown &&
            !(event.target === droplistElement || droplistElement.contains(event.target as Node))
        ) {
            showDropdown = false;
        }
    }
</script>

<svelte:window on:click={onBlur} />

<header class="main-header u-padding-inline-end-0">
		<a class="logo" href="/home">
			<img src={logo} alt="PollHub Logo" width="60" height="60" />
		</a>
		<div class="main-header-end ">
			<nav class="u-flex u-height-100-percent u-sep-inline-start">
				<div class="drop-wrapper" bind:this={droplistElement}>
					<button class="user-profile-button" on:click={() => (showDropdown = !showDropdown)}>
						<AvatarInitials size={40} name="Bishwajeet Parhi" />
						<span class="user-profile-info u-flex u-main-center u-cross-center"
							><span class="name">User</span>
							<span
								class=""
								aria-hidden="true"
								class:icon-cheveron-up={showDropdown}
								class:icon-cheveron-down={!showDropdown}
							/></span
						></button
					>
					{#if showDropdown}
						<div
							class="drop is-no-arrow is-block-end is-inline-end"
							transition:slide={{ duration: 100 }}
						>
							<section class="drop-section">
								<ul class="drop-list">
									<DropListItem
										icon="logout-right"
										on:click={() => {
											showDropdown = false;
											//TODO: Add logout functionality
										}}
									>
										Sign Out
									</DropListItem>
								</ul>
							</section>
						</div>
					{/if}
				</div>
			</nav>
		</div>
	</header>