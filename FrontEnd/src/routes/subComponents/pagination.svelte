<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import Arbol from './arbol.svelte';
	let data = [];
	const dispatch = createEventDispatcher();
	
	let numberOfPages = 0;
	let currentPage = 0;
	let productPerPage = 5;
	
	function setData(d){
		data = d;
		numberOfPages = Math.ceil(d.length/productPerPage);
	}

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
		data = data.sort((a,b)=>dir==0 ? (a.cost-b.cost) : (b.cost-a.cost))
	}

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
		 		setData(res.data);
			})
		}).catch(err=>{
			alert("Error consiguiendo productos.");
		})
	});

	function cartCountChange(e){
		dispatch('cartCount', e.detail)
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

<div class="container">
	<aside class="menu">
		<div class="container">
			<div class="btn btn-primary boton" on:click={()=>sort(0)}>Precio mas bajo a mas alto</div>
			<div class="btn btn-primary boton" on:click={()=>sort(1)}>Precio mas alto a mas bajo</div>
		</div>
	</aside>
	
	<div class="arboles">
		{#each data.slice(currentPage*productPerPage, (currentPage*productPerPage)+productPerPage) as element}
			<Arbol data={element} on:cartCount={cartCountChange}/>
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
</div>
