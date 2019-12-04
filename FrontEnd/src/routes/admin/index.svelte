<script>
	import * as sapper from '@sapper/app';
	import { onMount } from 'svelte';

	let products = [];
	let auth = false;
	
	onMount(()=>{
		var a = localStorage.getItem('auth');
		if(!a || a==null){
			sapper.goto('admin/login')
		}
		auth = JSON.parse(a);

		getProducts();
	});

	const url = 'http://localhost:2020/admin/products';
	function getProducts(){
		fetch(url, {
			method: 'POST',
			body: JSON.stringify({ token: auth.token }),
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
				products = res.data;
			})
		}).catch(err=>{
			alert("Error haciendo login.");
		})
	}
</script>


<style>
	.table{
		max-width: 600px;
		margin: auto;
		margin-top: 20px;
	}
</style>
<table class="table">
	<thead>
		<tr>
			<th>Nombre</th>
			<th>Costo</th>
			<th>Editar</th>
			<th>Borrar</th>
		</tr>
	</thead>
	<tbody>
		{#each products as p}
			<tr>
				<th scope="row">{p.name}</th>
				<td>${p.cost}</td>
				<td>
					<a class="btn btn-secondary" href="/admin/product/{p._id}">Editar</a>
				</td>
				<td>
					<div class="btn btn-danger">Borrar</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>