<script lang="ts">
	import logo from '../../assets/poll-hub-transparent-large.png';
	let email: string = '';
</script>

<div
	class="u-flex u-main-space-between u-cross-center fullscreen u-padding-32 theme-dark u-flex-vertical-mobile"
>
	<div class="u-stretch">
		<img src={logo} class="image u-max-width-300" alt="logo" />
	</div>

	<div class="box u-stretch">
		<h1 class="heading-level-2 u-text-center">Password Recovery</h1>
		<form class="form u-margin-block-start-24">
			<ul class="form-list">
				<li class="form-item">
					<label class="label" for="name">Email</label>
					<div class="input-text-wrapper">
						<input
							type="email"
							class="input-text u-padding-inline-end-56"
							placeholder="Email"
							name="Email"
							value={email}
						/>
					</div>
				</li>
			</ul>
			<div class="form-footer">
				<button class="button u-width-full-line u-main-center" type="submit"> Recover </button>

				<div class="u-flex u-main-center u-cross-center u-gap-8 u-margin-block-start-12">
					<button class="is-text u-bold">
						<a href="#/login" class="text">Sign in</a>
					</button>

					<div class="divider-horizontal u-cross-child-center">|</div>

					<button class="is-text u-bold">
						<a href="#/signup" class="text">Sign Up</a>
					</button>
				</div>
			</div>
		</form>
	</div>
</div>

<style lang="scss">
	.box {
		background-color: hsl(var(--color-neutral-300));
		border-radius: var(--border-radius-small);
	}

	.form-footer {
		border: none;
		margin: 0;
	}
</style>
