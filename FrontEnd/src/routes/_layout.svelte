<script>
	import Nav from '../components/Nav.svelte';
	import Banner from '../components/Banner.svelte';

	export let segment;
</script>

<style>

	:global(body) {
		/* this will apply to <body> */
		/* your styles go here */
	}

	main {
		position: relative;
		max-width: 100%;
		height: 100%;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
		background-image: url('https://images.unsplash.com/photo-1567959929898-eb7001451fd5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80');
	}
</style>

<Banner/>

<Nav {segment}/>

<main>
	<slot></slot>
</main>