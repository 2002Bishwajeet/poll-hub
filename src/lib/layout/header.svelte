<script lang="ts">
	import { slide } from 'svelte/transition';
	import logo from '../../assets/poll-hub-transparent-large.png';
	import DropListItem from '../components/dropListItem.svelte';
	import AvatarInitials from '../components/avatarInitials.svelte';
	import type { AuthenticationBase } from '../sdk/authenticationBase';
	import { addNotification } from '../store/notification';
	import { replace } from 'svelte-spa-router';
	import appwriteSdk from '../sdk/appwrite/appwriteSdk';
	import { user } from '../store/user';
	import type { User } from '../models/userModel';
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
	let auth: AuthenticationBase = appwriteSdk.Authentication;

	function logout() {
		try {
			auth.logout();
			addNotification({
				type: 'success',
				message: 'Logout successful',
				timeout: 2000
			});
			replace('/');
		} catch (error) {
			addNotification({
				type: 'error',
				message: error.message,
				timeout: 2000
			});
		}
	}

	let currentUser: User = null;

	user.subscribe((value) => {
		currentUser = value;
	});
</script>

<svelte:window on:click={onBlur} />

<header class="main-header u-padding-inline-end-0">
	<a class="logo" href="/home">
		<img src={logo} alt="PollHub Logo" width="60" height="60" />
	</a>
	<div class="main-header-end">
		<nav class="u-flex u-height-100-percent u-sep-inline-start">
			<div class="drop-wrapper" bind:this={droplistElement}>
				<button class="user-profile-button" on:click={() => (showDropdown = !showDropdown)}>
					<AvatarInitials size={40} name={currentUser.name} url={currentUser.avatar} />
					<span class="user-profile-info u-flex u-main-center u-cross-center"
						><span class="name">{currentUser.name}</span>
						<span
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
								<DropListItem icon="logout-right" on:click={logout}>Sign Out</DropListItem>
							</ul>
						</section>
					</div>
				{/if}
			</div>
		</nav>
	</div>
</header>
