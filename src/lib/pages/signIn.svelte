<script lang="ts">
	import logo from '../../assets/poll-hub-transparent-large.png';
	import IconButton from '../components/iconButton.svelte';
	import { colors } from '../utils/colors';
	import FormList from '../elements/form/formList.svelte';
	import InputEmail from '../elements/form/inputEmail.svelte';
	import InputPassword from '../elements/form/inputPassword.svelte';
	import { addNotification } from '../store/notification';
	import type { AuthenticationBase } from '../sdk/authenticationBase';
	import { querystring, replace, link } from 'svelte-spa-router';
	import appwriteSdk from '../sdk/appwrite/appwriteSdk';
	let mail: string, pass: string;

	let signUpLink: string = `/signup?${$querystring}`;

	let authentication: AuthenticationBase = appwriteSdk.Authentication;

	function navigate() {
		if ($querystring) {
			const redirect_uri = new URLSearchParams($querystring).get('redirect_uri');
			replace(redirect_uri);
		} else {
			replace('/home');
		}
	}

	async function login() {
		try {
			await authentication.login(mail, pass);
			addNotification({
				type: 'success',
				message: 'SignIn successful'
			});
			navigate();
		} catch (error) {
			addNotification({
				type: 'error',
				message: error.message
			});
		}
	}

	async function anonymousLogin() {
		try {
			await authentication.signInAnonymously();
			addNotification({
				type: 'success',
				message: 'SignIn successful'
			});
			navigate();
		} catch (err) {
			addNotification({
				type: 'error',
				message: err.message
			});
		}
	}

	function signInWithGithub() {
		try {
			authentication.loginWithGithub();
			addNotification({
				type: 'success',
				message: 'SignIn successful'
			});
			navigate();
		} catch (err) {
			addNotification({
				type: 'error',
				message: err.message
			});
		}
	}

	function signInWithDiscord() {
		try {
			authentication.loginWithDiscord();
			addNotification({
				type: 'success',
				message: 'SignIn successful'
			});
			navigate();
		} catch (err) {
			addNotification({
				type: 'error',
				message: err.message
			});
		}
	}
</script>

<div
	class="u-flex u-main-space-between u-cross-center fullscreen u-padding-32 theme-dark u-flex-vertical-mobile"
>
	<div class="u-stretch">
		<img src={logo} class="image u-max-width-300" alt="logo" />
	</div>

	<div class="box u-stretch">
		<h1 class="heading-level-2 u-text-center">Sign In</h1>
		<form class="form u-margin-block-start-24" on:submit|preventDefault={login}>
			<FormList>
				<InputEmail
					id="email"
					label="Email"
					placeholder="Email"
					autofocus={true}
					required={true}
					bind:value={mail}
				/>
				<InputPassword
					id="password"
					label="Password"
					placeholder="Password"
					required={true}
					meter={false}
					showPasswordButton={true}
					bind:value={pass}
				/>
			</FormList>

			<div class="form-footer">
				<div class="u-flex u-flex-vertical u-cross-center u-gap-12">
					<button class="button u-width-full-line u-main-center" type="submit"> Sign in </button>
					<button
						class="button is-secondary u-width-full-line u-main-center"
						type="button"
						on:click={anonymousLogin}
					>
						Sign in anonymously
					</button>
				</div>
				<div class="u-flex u-cross-center u-gap-12 u-margin-block-start-12">
					<hr class="divider" />
					<p class="text u-bold">OR</p>
					<hr class="divider" />
				</div>
				<div class="u-flex u-cross-center u-gap-16 u-margin-block-start-16">
					<IconButton
						name="Sign in with Github"
						icon="icon-github"
						buttonColor={colors.github}
						onClick={signInWithGithub}
					/>
					<IconButton
						name="Sign in with Discord"
						icon="icon-discord"
						buttonColor={colors.discord}
						onClick={signInWithDiscord}
					/>
				</div>

				<div class="u-flex u-main-center u-cross-center u-gap-8 u-margin-block-start-12">
					<button class="is-text u-bold">
						<a href="#/recovery" class="text">Forgot Password</a>
					</button>

					<div class="divider-horizontal u-cross-child-center">|</div>

					<button class="is-text u-bold">
						<a href={signUpLink} use:link class="text">Sign Up</a>
					</button>
				</div>
			</div>
		</form>
	</div>
</div>

<style lang="scss">
	.divider {
		flex-grow: 1;
		border-top: 1px solid hsl(var(--color-neutral-100));
	}
	.box {
		background-color: hsl(var(--color-neutral-300));
		border-radius: var(--border-radius-small);
	}
	.divider-horizontal {
		color: hsl(var(--color-neutral-100));
	}
	.form-footer {
		border: none;
		margin: 0;
	}
</style>
