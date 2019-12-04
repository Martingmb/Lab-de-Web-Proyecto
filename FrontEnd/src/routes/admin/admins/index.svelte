<script>
	import * as sapper from '@sapper/app';
	import { onMount } from 'svelte';

	let users = [];
	let auth = false;
	let deleting = false;
	
	onMount(()=>{
		var a = localStorage.getItem('auth');
		if(!a || a==null){
			sapper.goto('admin/login')
		}
		auth = JSON.parse(a);

		getUsers();
	});

	const url = 'http://localhost:2020/admin/users';
	function getUsers(){
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
				users = res.data;
			})
		}).catch(err=>{
			alert("Error haciendo login.");
		})
	}

	const url_delete = 'http://localhost:2020/admin/users/delete';
	function deleteAdmin(name, id){
		if(deleting) return;
		var d = confirm('¿Deseas borrar el usuario ' + name + '?');
		if(!d) return;
		deleting = true;
		fetch(url_delete, {
			method: 'POST',
			body: JSON.stringify({ token: auth.token, id: id }),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response=>{
			deleting = false;
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
				if(res.data.deleted){
					users = [];
					getUsers();
				}
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
	.header{
		font-size: 24px;
		font-weight: 600;
	}
	.container{
		text-align: center;
	}
</style>

<div class="container">
	<div class="header">Administrador de Usuarios</div>
	<a class="btn btn-success" href="/admin/admins/add">Agregar usuario</a>
</div>

<table class="table">
	<thead>
		<tr>
			<th>Nombre</th>
			<th>Correo</th>
			<th>Borrar</th>
		</tr>
	</thead>
	<tbody>
		{#each users as u}
			<tr>
				<th scope="row">{u.name}</th>
				<td>{u.email}</td>
				<td>
					<div class="btn btn-danger" on:click={()=>deleteAdmin(u.name, u._id)}>Borrar</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>