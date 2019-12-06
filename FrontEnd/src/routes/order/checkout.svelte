<script>
	import 'bootstrap/dist/css/bootstrap.css'
	import { onMount } from 'svelte';
	import * as sapper from '@sapper/app';

	let order;
	let order_info = {
		name: 'Prueba',
		email: 'a00819118@itesm.mx',
		street: 'Calle prueba',
		number_exterior: '123',
		neighborhood: 'Centro',
		city: 'Monterrey',
		state: 'Nuevo Leon',
		zipcode: '64000',
		phone: '81 0000 0000'
	}

	onMount(()=>{
		var o = localStorage.getItem('order');
		if(!o || o==null){
			sapper.goto('cart');
			return;
		}

		order = JSON.parse(o);
	})

	function finish(){
		const url = 'http://localhost:2020/checkout/finish';
		// console.log(JSON.stringify({ ...order_info, order_token: order.order_token }));
		fetch(url, {
			method: 'POST',
			body: JSON.stringify({ ...order_info, order_token: order.order_token }),
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
				localStorage.removeItem('order');
				localStorage.removeItem('cart');
				sapper.goto('order/'+res.data.id);
			})
		}).catch(err=>{
			alert("Error procesando la orden.");
		})
	}

	function addCommas(x) {
		return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
</script>

<style>
	.maincontainer{
		max-width: 600px;
		margin: auto;
		margin-top: 20px;
	}
	.title{
		margin-top: 10px;
		text-align: center;
	}
</style>

<svelte:head>
	<title>Checkout</title>
</svelte:head>

<h1 class="title">Información de compra</h1>
<div class="col-sm-8 offset-2 shadow p-3 mb-5 bg-white rounded maincontainer">
	<div class="contacto">
		<div class="form-group">
			<label>Nombre</label>
			<input type="text" class="form-control" placeholder="Nombre" bind:value={order_info.name}>
		</div>
		
		<div class="form-group">
		</div>

		<div class="form-group">
			<div class="row">
				<div class="col-md-6">
					<label>Correo electrónico</label>
					<input type="email" class="form-control" placeholder="ejemplo@ejemplo.com" bind:value={order_info.email}>
				</div>
				<div class="col-md-6">
					<label>Teléfono</label>
					<input type="text" class="form-control" placeholder="81 0000 0000" bind:value={order_info.phone}>
				</div>            
			</div>
		</div>
		
		<div class="form-group">
			<div class="row">
				<div class="col-md-6">
					<label>Calle</label>
					<input type="text" class="form-control" placeholder="Calle Principal" bind:value={order_info.street}>
				</div>
				<div class="col-md-6">
					<label>Número</label>
					<input type="text" class="form-control" placeholder="1234" bind:value={order_info.number_exterior}>                   
				</div>            
			</div>
		</div>
		
		<div class="form-group">
			<div class="row">
				<div class="col-md-6">
					<label>Colonia</label>
					<input type="text" class="form-control" placeholder="Colonia Encino" bind:value={order_info.neighborhood}>           
				</div>
				<div class="col-md-6">
					<label>Código Postal</label>
					<input type="text" class="form-control" placeholder="1234" bind:value={order_info.zipcode}>                   
				</div>            
			</div>
		</div>

		<div class="form-group">
			<label>Ciudad</label>
			<input type="text" class="form-control" placeholder="Ciudad" bind:value={order_info.city}>
		</div>
		<div class="form-group">
			<label>Estado</label>
			<input type="text" class="form-control" placeholder="Estado" bind:value={order_info.state}>
		</div>
		<div class="row">
			<div style="text-align: right; width: 100%; padding: 0 15px; cursor: pointer;">
				<div class="btn btn-primary" style="color:#ffffff;" on:click={finish}>Continuar</div>
			</div>
		</div>
	</div>
</div>
<h2 class="title" style="font-size: 24px;">Productos</h2>
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
<footer class="page-footer font-small blue">
	<div class="footer-copyright text-center py-3">
		Viveros de los Santos © 2019
	</div>
</footer>


