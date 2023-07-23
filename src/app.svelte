<script lang="ts">
	import Router, {
		replace,
		type ConditionsFailedEvent,
		type RouteDetail,
		type RoutePrecondition,
		type RouteLoadingEvent
	} from 'svelte-spa-router';
	import { wrap } from 'svelte-spa-router/wrap';

	import '@appwrite.io/pink';
	import NotFound from './lib/pages/notFound.svelte';
	import Landing from './lib/pages/landing.svelte';
	import Signin from './lib/pages/signIn.svelte';
	import Home from './lib/pages/home.svelte';
	import Signup from './lib/pages/signUp.svelte';
	import ForgotPassword from './lib/pages/forgotPassword.svelte';
	import Notifications from './lib/Notifications.svelte';
	import type SDK from './lib/sdk/sdk';
	import MockSDK from './lib/sdk/mock/mockSdk';

	let sdk: SDK = MockSDK;

	const routes = {
		'/': wrap({
			component: Landing,
			conditions: [
				(event: RouteDetail) => {
					const user = sdk.Authentication.getCurrentUser();
					if (user) {
						return false;
					}
					return true;
				}
			]
		}),
		'/login': Signin,
		'/signup': Signup,
		'/recovery': ForgotPassword,
		'/home': wrap({
			component: Home,
			conditions: [
				(event: RouteDetail) => {
					const user = sdk.Authentication.getCurrentUser();
					if (!user) {
						replace('/');
						return false;
					}
					return true;
				}
			]
		}),
		// Catch-all
		// This is optional, but if present it must be the last
		'*': NotFound
	};

	// Handles the "conditionsFailed" event dispatched by the router when a component can't be loaded because one of its pre-condition failed
	function conditionsFailed(event: ConditionsFailedEvent) {
		console.error('conditionsFailed event', event.detail);

		switch (event.detail.route) {
			case '/':
				replace('/home');
				break;
			case '/home':
				replace('/');
				break;
			default:
				replace('/');
				break;
		}
	}

	// Handles the "routeLoaded" event dispatched by the router when a component was loaded
	function routeLoaded(event: RouteLoadingEvent) {
		console.log('routeLoaded event', event.detail);
	}
</script>

<main class="theme-dark">
	<Notifications />
	<Router {routes} on:conditionsFailed={conditionsFailed} on:routeLoaded={routeLoaded} />
</main>

<style lang="scss"></style>
