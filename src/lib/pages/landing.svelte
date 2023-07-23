<script lang="ts">
	import logo from '../../assets/poll-hub-logo.png';
</script>

<div
	class="u-flex u-main-space-between u-cross-center fullscreen u-padding-32 u-flex-vertical-mobile"
>
	<div class="u-cross-center u-main-end u-flex is-only-mobile" style="width: 8rem;">
		<img src={logo} class="image" alt="logo" />
	</div>
	<div class="flex-3">
		<h1 class="heading-level-1">
			<span>Poll</span>
			<span style="color: hsl(var(--color-primary-200));">Hub</span>
		</h1>
		<h3 class="heading-level-3">Create realtime polls in minutes</h3>
		<button class="button is-big u-margin-block-start-16">
			<a href="#/login">Start now</a>
		</button>
	</div>
	<div class="u-max-width-300 u-cross-center u-main-end u-flex is-not-mobile">
		<img src={logo} class="image" alt="logo" />
	</div>
</div>

<style lang="scss">
	/* Responsive Variables */
	$break1: '(max-width:767.99px)';
	$break2: '(min-width:768px) and (max-width:1198.99px)';
	$break2open: '(min-width:768px)';
	$break3open: '(min-width:1199px)';

	.flex-3 {
		--flex: 3;
		flex: var(--flex);
		@media #{$break1} {
			--flex: 3;
			text-align: center;
			align-items: center;
			display: flex;
			flex-direction: column;
			margin-top: 3rem;
		}
	}

	.image {
		--width: 100%;
		width: var(--width);
		@media #{$break2} {
			--width: 60%;
		}
	}

	// .u-flex-vertical-mobile{
	//   justify-content: center;
	//   align-items: center;
	//   align-self: center;
	// }

	.heading-level-1 {
		--font-size: 5rem;
		color: hsl(var(--color-neutral-0));
		font-size: var(--font-size);
		/* here you put code for all screen sizes */
		@media #{$break1} {
			--font-size: 3rem;
		} /* only small screens */
		@media #{$break1}, #{$break2} {
		} /* small & medium screens */
		@media #{$break2} {
			--font-size: 6rem;
		} /* only medium screens */
		@media #{$break3open} {
			--font-size: 10rem;
		} /* small & large screens */
	}
	.heading-level-3 {
		--font-size: 1.75rem;
		color: hsl(var(--color-neutral-0));
		font-size: var(--font-size);
		font-weight: 500;
		@media #{$break1} {
			--font-size: 1.5rem;
		} /* only small screens */
		@media #{$break2} {
			--font-size: 2rem;
		} /* only medium screens */
		@media #{$break3open} {
			--font-size: 3rem;
		} /* small & large screens */
	}
</style>
