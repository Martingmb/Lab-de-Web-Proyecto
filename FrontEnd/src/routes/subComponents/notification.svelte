<script>
	import * as sapper from '@sapper/app';
	import { onMount } from 'svelte';

	export let data;
	
	function noItems() {
		alert("No hay productos en el carrito.");
	}
	
	function goToCart() {
		sapper.goto('cart');
	}
</script>

<style>
	i {
		cursor: pointer;
	}
	
	.notification {
		text-decoration: none;
		padding: 15px 26px;
		position: relative;
		display: inline-block;
		border-radius: 2px;
		right: 0;
		margin-right: 45px;
	}
	
	.notification .badge {
		position: absolute;
		top: -10px;
		right: -10px;
		padding: 5px 10px;
		border-radius: 50%;
		background: red;
		color: white;
	}
	
	.container {
		border-radius: 1em;
	}
</style>

{#if data == 0}
	<i class="fas fa-shopping-cart notification" on:click={noItems}></i>
{:else}
	<i class="fas fa-shopping-cart notification" on:click={goToCart}><span class="badge">{data}</span></i>
{/if}