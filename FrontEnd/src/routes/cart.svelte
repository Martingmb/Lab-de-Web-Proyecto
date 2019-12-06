<script>
	import * as sapper from '@sapper/app';
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

	function checkout(){
		const url = 'http://localhost:2020/checkout';
		fetch(url, {
			method: 'POST',
			body: JSON.stringify({ items: cart }),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response=>{
			response.json().then(res=>{
				console.log(res);
				if(res.error){
					alert(res.error.message);
					return;
				}
				localStorage.setItem('order', JSON.stringify(res.data));
				localStorage.removeItem('cart');
				sapper.goto('order/checkout');
			})
		}).catch(err=>{
			alert("Error haciendo login.");
		})
	}
</script>
<style>
	.container{
		max-width: 700px;
	}
	.container .notification{
		margin-bottom: 10px;
	}
	.btn{
		cursor: pointer;
	}
</style>
<nav class="navbar navbar-expand-lg navbar-light bg-light" id ="navContainer3" style="margin-bottom: 10px;">
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
	<h1 class="title">Carrito</h1>
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
				{#if cart.length==0}
				<tr>
					<td colspan="4" style="text-align: center; font-weight: 600; font-size: 24px;">Carrito vacio</td>
				</tr>
				{/if}
				{#each cart as item}
				<tr>
					<td>{item.name}</td>
					<td>{item.quantity}</td>
					<td>${addCommas(item.cost)}</td>
					<td>${addCommas(item.cost*item.quantity)}</td>
				</tr>
				{/each}
				<tr>
					<td colspan="3" style="font-weight: 600; text-align: right;">Total</td>
					<td>${ addCommas(cart.reduce((a,b)=>a+(b.cost*b.quantity), 0)) }</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div style="text-align: right; margin-top: 0">
		<div class="btn btn-primary" style="color:#ffffff;" on:click={checkout}>Checkout</div>
	</div>
</div>
