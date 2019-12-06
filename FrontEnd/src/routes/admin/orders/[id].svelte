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
	let auth;

	onMount(()=>{
		var a = localStorage.getItem('auth');
		if(!a || a==null){
			sapper.goto('admin/login')
		}
		auth = JSON.parse(a);

		const url = 'http://localhost:2020/admin/orders/get';
		fetch(url, {
			method: 'POST',
			body: JSON.stringify({ token: auth.token, id: order_id }),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response=>{
			response.json().then(res=>{
				console.log(res);
				if(res.error){
					if(res.error.code==101){
						localStorage.setItem('auth', null);
						sapper.goto('admin/login')
						return;
					}
					alert("Error consiguiendo la orden.");
					sapper.goto('admin/orders')
					return;
				}
				order = res.data;
			})
		}).catch(err=>{
			alert("Error consiguiendo la orden.");
			sapper.goto('admin/orders')
		})
	});

	function fulfilled(){
		const url = 'http://localhost:2020/admin/orders/mark';
		fetch(url, {
			method: 'POST',
			body: JSON.stringify({ token: auth.token, id: order_id }),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response=>{
			response.json().then(res=>{
				console.log(res);
				if(res.error){
					if(res.error.code==101){
						localStorage.setItem('auth', null);
						sapper.goto('admin/login')
						return;
					}
					alert(res.error.message);
					return;
				}
				order.fulfilled = true;
			})
		}).catch(err=>{
			alert("Error marcando la orden.");
		})
	}

	function addCommas(x) {
		return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	function logout(){
		localStorage.removeItem('auth');
		sapper.goto('admin/login');
	}
</script>
<style>
	body{
		background-color: #f5f5f5;
	}
	.pidearbol {
		margin-top: 20px;
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

<nav class="navbar navbar-expand-lg navbar-light bg-light" id ="navContainer3">
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	
	<div class="collapse navbar-collapse" id="navbarNav2">
		<ul class="navbar-nav" style="flex-grow: 100;">
			<li class="nav-item">
				<div class="nav-link admin">Administrador</div>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="/admin">Productos</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="/admin/admins">Usuarios</a>
			</li>
			<li class="nav-item active">
				<a class="nav-link" href="/admin/orders">Ordenes</a>
			</li>
		</ul>
		<button type="button" class="btn btn-light logout" on:click={logout}>Cerrar sesión</button>
	</div>
</nav>

<section class="pidearbol">
	<div class="container">
		<div class="row">
			<div class="col-sm-8 offset-2 shadow p-3 mb-5 bg-white rounded">
				<h1 class="titulopidearbol">Información de orden</h1>
				{#if order && !order.fulfilled}
					<button class="btn btn-primary" on:click={fulfilled} style="margin: auto; display: block; margin-bottom: 10px;">Marcar como entregada</button>
				{/if}

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
							<th scope="row" class="infoorden">Entregada</th>
							<td>{!order ? '' : (order.fulfilled ? 'Si' : 'No')}</td>
						</tr>
					</tbody>
				</table>

				<p class="nuestrosservicios">Dirección</p>
				<table class="table" style="max-width: 600px; margin: auto;">
					<tbody>
						<tr>
							<th scope="row" class="infoorden">Nombre</th>
							<td>{order ? order.name : ''}</td>
						</tr>
						<tr>
							<th scope="row" class="infoorden">Calle</th>
							<td>{order ? order.address.street : ''}</td>
						</tr>
						<tr>
							<th scope="row" class="infoorden">Número</th>
							<td>{order ? order.address.number_exterior : ''}</td>
						</tr>
						<tr>
							<th scope="row" class="infoorden">Colonia</th>
							<td>{order ? order.address.neighborhood : ''}</td>
						</tr>
						<tr>
							<th scope="row" class="infoorden">Código postal</th>
							<td>{order ? order.address.zipcode : ''}</td>
						</tr>
						<tr>
							<th scope="row" class="infoorden">Ciudad</th>
							<td>{order ? order.address.city : ''}</td>
						</tr>
						<tr>
							<th scope="row" class="infoorden">Estado</th>
							<td>{order ? order.address.state : ''}</td>
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
			</div>
		</div>
	</div>
</section>