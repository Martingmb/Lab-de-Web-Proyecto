<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let data = {}

	function addToCart(){
		var cart = localStorage.getItem('cart');
		if(cart && cart!=null) cart = JSON.parse(cart);
		else cart = []
		var ix = cart.length==0 ? -1 : cart.findIndex(a=>a.id==data._id);
		if(ix!=-1){
			cart[ix].quantity = cart[ix].quantity+1;
		}else{
			cart.push({
				id: data._id,
				quantity: 1,
				name: data.name,
				cost: data.cost
			})
		}
		localStorage.setItem('cart', JSON.stringify(cart));
		dispatch('cartCount', cart.length);
	}	
</script>

<style>
	h1 {
		color: white;
	}
</style>


<div class="container">
	<div class="modal  is-active">
		<div class="modal-background" on:click='{() => dispatch("close")}'></div>
		<div class="modal-content">
			<div class="container">
				<div class="notification">
					<div class="columns">
						<div class="column">
							{#if data.image}
							<img class="imagenarbol" src="{data.image}" alt="arbol">
							{/if}
							<hr>
						</div>
						<div class="column">
							<h3 class="title is-3">Información Árbol</h3>
							<h3 class="title is-3">{data.name}</h3>
							<p class="title is-3"><b>Precio:</b> ${data.cost}</p>
							{#if data.origin}
								<p> <strong>Origen:</strong> {data.origin}</p>
							{/if}
							{#if data.zone}
								<p> <strong>Zona:</strong> {data.zone}</p>
							{/if}
							{#if data.height}
								<p> <strong>Altura:</strong> {data.height}</p>
							{/if}
							{#if data.growth}
								<p> <strong>Crecimiento:</strong> {data.growth}</p>
							{/if}
							{#if data.type}
							<p> <strong>Tipo de arbol:</strong> {data.type}</p>
							{/if}
							{#if data.soil}
								<p> <strong>Suelo:</strong> {data.soil}</p>
							{/if}
							{#if data.water}
								<p> <strong>Agua:</strong> {data.water}</p>
							{/if}
							{#if data.uses}
								<p> <strong>Usos:</strong> {data.uses}</p>
							{/if}
							<hr>
							<button class="button is-primary" on:click={addToCart}>Agregar a carrito</button>
							<button class="button is-danger" on:click='{() => dispatch("close")}'>Cerrar</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<button class="modal-close is-large" aria-label="close" on:click='{() => dispatch("close")}'></button>
	</div>
</div>
