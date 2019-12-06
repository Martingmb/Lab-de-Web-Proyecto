<script>
	import * as sapper from '@sapper/app';
	import { onMount } from 'svelte';

	let orders = [];
	let auth = false;
	let showing_fulfilled = false;
	
	onMount(()=>{
		var a = localStorage.getItem('auth');
		if(!a || a==null){
			sapper.goto('admin/login')
		}
		auth = JSON.parse(a);

		getOrders(false);
	});

	const url = 'http://localhost:2020/admin/orders/list';
	function getOrders(fulfilled=false){
		showing_fulfilled = fulfilled;
		fetch(url, {
			method: 'POST',
			body: JSON.stringify({ token: auth.token, fulfilled }),
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
				orders = res.data;
			})
		}).catch(err=>{
			alert("Error haciendo login.");
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
	.table{
		max-width: 600px;
		margin: auto;
		margin-top: 20px;
	}
	.header{
		font-size: 24px;
		font-weight: 600;
	}
	.container{
		text-align: center;
	}
	.navbar-nav .nav-item .nav-link{
		font-weight: 600;
		font-size: 20px;
		padding: 5px;
		margin: 0 10px;
	}
	.navbar-nav .nav-item .nav-link.admin{
		color: black;
		margin-right: 20px;
	}
</style>


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

<div class="container">
	<div class="header" style="margin: 5px 0;">
		Ordenes {showing_fulfilled ? 'Entregadas' : 'Pendientes'}
	</div>
</div>
{#if !showing_fulfilled}
	<button class="btn btn-primary" on:click={()=>getOrders(true)} style="margin: auto; display: block; margin-bottom: 10px;">Ver entregadas</button>
{:else}
	<button class="btn btn-primary" on:click={()=>getOrders(false)} style="margin: auto; display: block; margin-bottom: 10px;">Ver pendientes</button>
{/if}


<table class="table">
	<thead>
		<tr>
			<th>Nombre</th>
			<th>Productos</th>
			<th>Total</th>
			<th>Ver</th>
		</tr>
	</thead>
	<tbody>
		{#if orders.length==0}
		<tr>
			<td colspan="4" style="text-align: center; font-weight: 600; font-size: 24px;">No hay ordenes pendientes</td>
		</tr>
		{/if}
		{#each orders as o}
			<tr>
				<th scope="row">{o.name}</th>
				<td>{o.items.reduce((a,b)=>a+b.quantity, 0)}</td>
				<td>${addCommas(o.total)}</td>
				<td>
					<a class="btn btn-secondary" href="/admin/orders/{o._id}">Ver</a>
				</td>
			</tr>
		{/each}
	</tbody>
</table>