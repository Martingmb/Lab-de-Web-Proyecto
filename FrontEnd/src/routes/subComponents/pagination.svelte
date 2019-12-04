<script>
  	import { onMount, afterUpdate, tick, beforeUpdate } from 'svelte';
  	import { createEventDispatcher } from 'svelte';
  	import Arbol from './arbol.svelte';
  	export let processedData = [];
  	const dispatch = createEventDispatcher();

	let numberOfPages = 0;
	let currentPage = 0;
	let productPerPage = 5;

	function createPagination(data) {
		numberOfPages = Math.ceil(data.length / productPerPage) ; 
	}
  	afterUpdate(async () => {
		await tick();
      createPagination(processedData);
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

</script>

<style>
  .arboles {
		display: flex;
		flex-wrap: wrap;
  }
</style>

<div class="arboles">
	{#each processedData.slice(currentPage*productPerPage, (currentPage*productPerPage)+productPerPage) as element}
		<Arbol data={element}/>
	{/each}
</div>

<hr>

<nav class="pagination" role="navigation" aria-label="pagination">
  <div class="pagination-previous btn btn-primary" on:click={()=>decrementPage()}>Anterior</div>
  <div class="pagination-next btn btn-primary" on:click={()=>incrementPage()}>Siguiente</div>
  <ul class="pagination-list">
    {#each Array(numberOfPages) as _, i}
      <li>
        <div class="pagination-link is-current" aria-label="Page {i + 1}" aria-current="page" on:click={()=>goPage(i)}>{i + 1}</div>
      </li>
    {/each}
  </ul>
</nav>