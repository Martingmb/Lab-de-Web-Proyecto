<script>
	import { onMount } from 'svelte';
	import Pagination from './pagination.svelte'
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	
	function process(event) {
		dispatch('addToCart', event.detail);
	}

	let processedData = [];

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
		 		processedData = arrayToMatrix(res.data);
			})
		}).catch(err=>{
			alert("Error consiguiendo productos.");
		})
		//  processedData = arrayToMatrix(data);
	});

	const arrayToMatrix = (arr, columns = 3) => {
		let matrix = [];

		for (let i = 0, j = -1; i < arr.length; i++) {
			if(i % columns === 0) {
				j++;
				matrix[j] = [];
			}

			matrix[j].push(arr[i]);
		}

		return matrix;

	}




</script>



<style>

</style>

<div class="container">
	<Pagination processedData={processedData} on:addToCart={process}/>
</div>
