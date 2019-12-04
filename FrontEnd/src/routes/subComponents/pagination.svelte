<script>
  import { onMount, afterUpdate, tick, beforeUpdate } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import Arbol from './arbol.svelte';
  export let processedData = [];
  const dispatch = createEventDispatcher();

  let numberOfPages = 0;

  function createPagination(data) {
    console.log(data);
    numberOfPages = Math.floor(data.length / 3) ; 
    console.log(numberOfPages);
  }

  function processEvent(event) {
    console.log(event.detail);
    dispatch('addToCart', event.detail);
  }

  afterUpdate(async () => {
      // content here
      await tick();
      createPagination(processedData);
    });

</script>

<div class="notification">
	<div class="columns">
		{#each processedData as row}
		<div class="column">
			{#each row as element}
				<Arbol treeName={element.treeName} treeID={element.treeID} treePrice={element.treePrice} on:cartDetail={processEvent}/>
			{/each}
		</div>
		{/each}
	</div>
</div>

<hr>

<nav class="pagination" role="navigation" aria-label="pagination">
  <a class="pagination-previous" title="This is the first page" disabled>Anterior</a>
  <a class="pagination-next">Siguiente</a>
  <ul class="pagination-list">
    {#each Array(numberOfPages) as _, i}
      <li>
        <a class="pagination-link is-current" aria-label="Page {i + 1}" aria-current="page">{i + 1}</a>
      </li>
    {/each}
  </ul>
</nav>