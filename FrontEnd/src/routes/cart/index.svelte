<script>
	import { onMount } from 'svelte';
	let cart = []
	onMount(()=>{
		var c = localStorage.getItem('cart');
		if(c && c!=null){
			cart = JSON.parse(c);
		}
	});
	function addCommas(x) {
		return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
</script>
<nav class="navbar navbar-expand-lg navbar-light bg-light" id ="navContainer3" style="margin-bottom: 10px;">
	<a class="navbar-brand" href="#"></a>
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	<div class="collapse navbar-collapse" id="navbarNav2">
		<ul class="navbar-nav">
			<li class="nav-item">
				<a class="nav-link" href="/">Inicio</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="/arboles">Arboles</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="/contacto">Contacto</a>
			</li>
		</ul>
	</div>
</nav>
	
<div class="container">
	<h1 class="title">CART</h1>
	<div class="notification">
		<table class="table">
			<thead>
				<tr>
					<th><abbr title="Nombre">Nombre</abbr></th>
					<th><abbr title="Cantidad">Cantidad</abbr></th>
					<th><abbr title="Precio">Precio</abbr></th>
					<th><abbr title="Subtotal">Subtotal</abbr></th>
				</tr>
			</thead>
			<tbody>
				{#each cart as item}
				<tr>
					<td>{item.name}</td>
					<td>{item.quantity}</td>
					<td>${addCommas(item.cost)}</td>
					<td>${addCommas(item.cost*item.quantity)}</td>
				</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
