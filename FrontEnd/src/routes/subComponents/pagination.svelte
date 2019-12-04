<script>
	import { onMount, afterUpdate, tick, beforeUpdate } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import Arbol from './arbol.svelte';
	export let data = [];
	const dispatch = createEventDispatcher();
	
	let numberOfPages = 0;
	let currentPage = 0;
	let productPerPage = 5;
	
	function createPagination(data) {
		numberOfPages = Math.ceil(data.length / productPerPage) ; 
	}
	afterUpdate(async () => {
		await tick();
		createPagination(data);
	});
	
	function incrementPage(){
		currentPage = Math.min(numberOfPages-1, currentPage+1)
	}
	
	function decrementPage(){
		currentPage = Math.max(0, currentPage-1)
	}
	
	function goPage(p){
		currentPage = p;
	}
	
	function sort(dir){
		console.log(data);
		data = data.sort((a,b)=>dir==0 ? (a.cost-b.cost) : (b.cost-a.cost))
		console.log(data);
	}
	
	function processEvent(event) {
		console.log(event.detail);
		dispatch('addToCart', event.detail);
	}
</script>

<style>
	.arboles {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	@media screen and (max-width: 520px){
		.menu .container .btn:last-child{
			margin-top: 10px;
		}
	}
</style>

<aside class="menu">
	<div class="container">
		<div class="btn btn-primary boton" on:click={()=>sort(0)}>Precio mas bajo a mas alto</div>
		<div class="btn btn-primary boton" on:click={()=>sort(1)}>Precio mas alto a mas bajo</div>
	</div>
</aside>

<div class="arboles">
	{#each data.slice(currentPage*productPerPage, (currentPage*productPerPage)+productPerPage) as element}
		<Arbol data={element}  on:cartDetail={processEvent} />
	{/each}
</div>

<hr>

<nav class="pagination" role="navigation" aria-label="pagination">
	<div class="pagination-previous btn btn-primary" style="color: white;" on:click={()=>decrementPage()}>Anterior</div>
	<div class="pagination-next btn btn-primary" style="color: white;" on:click={()=>incrementPage()}>Siguiente</div>
	<ul class="pagination-list">
		{#each Array(numberOfPages) as _, i}
			<li>
				<div class="pagination-link is-current" aria-label="Page {i + 1}" aria-current="page" on:click={()=>goPage(i)}>{i + 1}</div>
			</li>
		{/each}
	</ul>
</nav>