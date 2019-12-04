<script>
	import { onMount } from 'svelte';
	import Pagination from './pagination.svelte'
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	
	function process(event) {
		dispatch('addToCart', event.detail);
	}

	let data = [];

	onMount(() => {
		fetch('http://localhost:2020/products', {
			method: 'POST',
			body: JSON.stringify({
				category: location.href.endsWith('rojo') ? 1 : 0
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response=>{
			response.json().then(res=>{
				console.log(res);
		 		data = res.data;
			})
		}).catch(err=>{
			alert("Error consiguiendo productos.");
		})
	});
</script>


<div class="container">
	<Pagination data={data} on:addToCart={process}/>
</div>
