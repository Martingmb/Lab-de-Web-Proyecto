<script>
	import { onMount } from 'svelte';
	import Pagination from './pagination.svelte'
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	
	function process(event) {
		dispatch('addToCart', event.detail);
	}

	let data = [
		{
			treeName: 'Arbol 1',
			treePrice: 10,
			treeID: 1
		},
		{
			treeName: 'Arbol 2',
			treePrice: 20,
			treeID: 2
		},
		{
			treeName: 'Arbol 3',
			treePrice: 30,
			treeID: 3
		},
		{
			treeName: 'Arbol 4',
			treePrice: 40,
			treeID: 4
		},
		{
			treeName: 'Arbol 5',
			treePrice: 50,
			treeID: 5
		},
		{
			treeName: 'Arbol 6',
			treePrice: 60,
			treeID: 6
		},
		{
			treeName: 'Arbol 4',
			treePrice: 40,
			treeID: 4
		},
		{
			treeName: 'Arbol 5',
			treePrice: 50,
			treeID: 5
		},
		{
			treeName: 'Arbol 6',
			treePrice: 60,
			treeID: 6
		}
	];

	let processedData = [];

	onMount(() => {
		 processedData = arrayToMatrix(data);
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
