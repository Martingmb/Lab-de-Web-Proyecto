<script context="module">
	let order_id;
	export async function preload(page, session){
		const { id } = page.params;
		order_id = id;
	}
</script>

<script>
	import { onMount } from 'svelte';
	import * as sapper from '@sapper/app';

	let order = false

	onMount(()=>{
		const url = 'http://localhost:2020/order/get';
		fetch(url, {
			method: 'POST',
			body: JSON.stringify({ id: order_id }),
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
				order = res.data;
				// localStorage.removeItem('order');
				// localStorage.removeItem('cart');
				// sapper.goto('order/'+res.data.id);
			})
		}).catch(err=>{
			alert("Error procesando la orden.");
		})
	});
	function addCommas(x) {
		return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
</script>
<style>
	body{
		background-color: #f5f5f5;
	}
	.pidearbol {
		padding: 75px 75px 0px 75px;
	}
	.titulopidearbol {
		text-align: center;
		font-size: 30px;
		font-family: Raleway, Arial, Helvetica, sans-serif;
		font-weight: bold;
		padding-bottom: 15px;
		color: #000000;
	}
	.linea {
		border:1px solid gray;
		margin: auto;
		margin-bottom: 20px;
		width: 200px;
	}
	.nuestrosservicios {
		padding: 15px;
		color: black;
		text-align: center; 
		font-size: 20px;
	}
	.infoorden {
		font-weight: bold;
	}

</style>

<svelte:head>
	<title>Resumen de compra</title>
</svelte:head>

<section class="pidearbol">
	<div class="container">
		<div class="row">
			<div class="col-sm-8 offset-2 shadow p-3 mb-5 bg-white rounded">
				<h1 class="titulopidearbol">Resumen de orden</h1>
				<div class="linea"></div>
				<p class="nuestrosservicios">Información de la orden</p>
				
				<table class="table table-striped">
			 	 	<thead>
						<tr>
							<th scope="col" class="infoorden">No. de Orden</th>
							<th scope="col" style="font-weight:normal;">{order ? order.id : ''}</th>
						</tr>
				  </thead>
				  <tbody>
						<tr>
							<th scope="row" class="infoorden">Total a pagar</th>
							<td>{order ? '$'+addCommas(order.total) : ''}</td>
						</tr>
						<tr>
							<th scope="row" class="infoorden">Productos</th>
							<td>{!order ? '' : order.items.reduce((a,b)=>a+b.quantity, 0)}</td>
						</tr>
						<tr>
							<th scope="row" class="infoorden">Nombre</th>
							<td>{!order ? '' : order.name}</td>
						</tr>
						<tr>
							<th scope="row" class="infoorden">Correo</th>
							<td>{!order ? '' : order.email}</td>
						</tr>
						<tr>
							<th scope="row" class="infoorden">Dirección</th>
							<td>{!order ? '' : order.address.city + ', ' + order.address.zipcode}</td>
						</tr>
				  </tbody>
				</table>

				
				<p class="nuestrosservicios">Productos</p>
				{#if order}
				<table class="table" style="max-width: 600px; margin: auto;">
					<thead>
						<tr>
							<th><abbr title="Nombre">Nombre</abbr></th>
							<th><abbr title="Cantidad">Cantidad</abbr></th>
							<th><abbr title="Precio">Precio</abbr></th>
							<th><abbr title="Subtotal">Subtotal</abbr></th>
						</tr>
					</thead>
					<tbody>
						{#each (order ? order.items : []) as item}
						<tr>
							<td>{item.name}</td>
							<td>{item.quantity}</td>
							<td>${addCommas(item.cost)}</td>
							<td>${addCommas(item.cost*item.quantity)}</td>
						</tr>
						{/each}
						<tr>
							<td colspan="3" style="font-weight: 600; text-align: right;">Total</td>
							<td>${ order ? addCommas(order.items.reduce((a,b)=>a+(b.cost*b.quantity), 0)) : '' }</td>
						</tr>
					</tbody>
				</table>
				{/if}

				<div class="row">
					<div class="col-sm-2 offset-10">
						<a class="btn btn-primary" style="color:#ffffff;" href="/">Continuar</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>