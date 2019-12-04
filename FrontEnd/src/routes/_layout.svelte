<script>
	import { createEventDispatcher } from "svelte";
	import Banner from '../components/Banner.svelte';
	import AdminLogin from '../components/adminLogin.svelte';
    const dispatch = createEventDispatcher();

	let adminButton = false;

</script>

<style>

	main {
		position: relative;
		max-width: 100%;
		height: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<AdminLogin/>

{#if !adminButton} 
	<Banner/>
{/if}



<main>
	<slot></slot>
</main>