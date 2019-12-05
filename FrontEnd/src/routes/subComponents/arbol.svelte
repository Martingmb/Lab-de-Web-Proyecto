<script>
	import Modal from './modal.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let data = {}
	let showModal = false;

	function cartCountChange(e){
		dispatch('cartCount', e.detail)
	}
</script>


<style>
	.preview {
		max-width: 200px;
		max-height: 200px;
		width: 100%;
		height: 100%;
	}
	
	.arbol {
		background-color: #ffffff;
		padding: 10px;
		margin: 10px;
		margin-top: 15px;
		width: 200px;
		height: 300px;
		border-radius: 4px;
	}
	
	.botonarbol {
		margin-top: 10px;
	}
	
	.name{
		font-weight: 600;
	}
</style>

<div class="arbol">
	<img class="preview" src="{data.image}" alt="arbol" >
	<div class="name">{data.name}</div>
	<button class="btn btn-success botonarbol" on:click="{() => {showModal = true}}">Ver Arbol</button>
	
	{#if showModal}
		<Modal data={data} on:close="{() => showModal = false}" on:cartCount={cartCountChange}/> 
	{/if}
</div>