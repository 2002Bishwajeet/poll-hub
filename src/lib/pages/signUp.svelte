<script lang="ts">
	import logo from '../../assets/poll-hub-transparent-large.png';
	import IconButton from '../components/iconButton.svelte';
	import FormList from '../elements/form/formList.svelte';
	import InputEmail from '../elements/form/inputEmail.svelte';
	import InputPassword from '../elements/form/inputPassword.svelte';
	import InputText from '../elements/form/inputText.svelte';
	import { addNotification } from '../store/notification';
	import { colors } from '../utils/colors';
	let name: string, mail: string, pass: string;

	async function register() {
		try {
			throw new Error('Not implemented');
		} catch (error) {
			addNotification({
				type: 'error',
				message: error.message
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
		<h1 class="heading-level-2 u-text-center">Sign Up</h1>
		<form class="form u-margin-block-start-24" on:submit={register}>
			<FormList>
				<InputText
					id="name"
					label="Name"
					placeholder="Your name"
					autofocus={true}
					bind:value={name}
				/>
				<InputEmail
					id="email"
					label="Email"
					placeholder="Your email"
					required={true}
					bind:value={mail}
				/>
				<InputPassword
					id="password"
					label="Password"
					placeholder="Your password"
					required={true}
					showPasswordButton={true}
					bind:value={pass}
				/>
			</FormList>
			<div class="form-footer">
				<button class="button u-width-full-line u-main-center" type="submit"> Sign up </button>
				<div class="u-flex u-cross-center u-gap-12 u-margin-block-start-12">
					<hr class="divider" />
					<p class="text u-bold">OR</p>
					<hr class="divider" />
				</div>
				<div class="u-flex u-cross-center u-gap-16 u-margin-block-start-16">
					<IconButton name="Sign in with Github" icon="icon-github" buttonColor={colors.github} />
					<IconButton
						name="Sign in with Discord"
						icon="icon-discord"
						buttonColor={colors.discord}
					/>
				</div>

				<div class="u-flex u-main-center u-cross-center u-gap-8 u-margin-block-start-12">
					<span class="text"> Already have an account? </span>

					<button class="is-text u-bold u-underline">
						<a href="#/login" class="text">Sign In</a>
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

	.form-footer {
		border: none;
		margin: 0;
	}
</style>
