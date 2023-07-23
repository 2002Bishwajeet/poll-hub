<script lang="ts">
	import Router from 'svelte-spa-router';
	import '@appwrite.io/pink';
	import NotFound from './lib/pages/notFound.svelte';
	import Landing from './lib/pages/landing.svelte';
	import Signin from './lib/pages/signIn.svelte';
	import Home from './lib/pages/home.svelte';
	import Signup from './lib/pages/signUp.svelte';
	import ForgotPassword from './lib/pages/forgotPassword.svelte';
	import Notifications from './lib/Notifications.svelte';

	const routes = {
		'/': Landing,
		'/login': Signin,
		'/signup': Signup,
		'/recovery': ForgotPassword,
		'/home': Home,
		// Catch-all
		// This is optional, but if present it must be the last
		'*': NotFound
	};
</script>

<main class="theme-dark">
	<Notifications />
	<Router {routes} />
</main>

<style lang="scss"></style>
