<script>
	import * as sapper from '@sapper/app';
	import { onMount } from 'svelte';

	let user = {
		name: '',
		email: '',
		password: '',
		pass2: ''
	}

	let sending = false;
	let errMsg = false;
	let auth;

	onMount(()=>{
		var a = localStorage.getItem('auth');
		if(!a || a==null){
			sapper.goto('admin/login')
		}
		auth = JSON.parse(a);
	});

	function saveProduct(){
		if(user.name.length<5 || user.email.length<4 || user.password.length<5){
			errMsg = 'Favor de llenar los datos por completo.'
			return
		}
		if(user.password!=user.pass2){
			errMsg = 'Las contraseñas no concuerdan.'
			return
		}

		errMsg = false;
		sending = true;

		const url = 'http://localhost:2020/admin/users/create';
		fetch(url, {
			method: 'POST',
			body: JSON.stringify({ token: auth.token, ...user }),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response=>{
			sending = false;
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
				sapper.goto('admin/admins');
			})
		}).catch(err=>{
			alert("Error creando usuario.");
		})
	}
</script>

<style>
	.messages{
		max-width: 600px;
		margin: auto;
	}
	.container{
		display: flex;
		justify-content: center;
		align-items: flex-start;
		max-width: 600px;
		margin: auto;
		margin-top: 20px;
	}
	.container .left{
		width: 150px;
		margin-right: 10px;
	}
	.container .left .button{
		margin-top: 5px;
		width: 100%;
	}
	.header{
		text-align: center;
		font-size: 24px;
		font-weight: 600;		
	}
</style>

<svelte:head>
	<title>Agregar Usuario - Vivero Admin</title>
</svelte:head>

<div class="header">
	Agregar Usuario
</div>
<div class="messages">
	{#if sending}
		<div class="alert alert-info" style="margin-top: 10px;">
			Agregando usuario...
		</div>
	{/if}
	{#if errMsg}
		<div class="alert alert-danger" style="margin-top: 10px;">
			{errMsg}
		</div>
	{/if}
</div>
<div class="container">
	<div class="right">
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text">Nombre</span>
			</div>
			<input type="text" class="form-control" placeholder="Nombre" bind:value={user.name}>
		</div>
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text">Correo</span>
			</div>
			<input type="text" class="form-control" placeholder="Correo" bind:value={user.email}>
		</div>
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text">Password</span>
			</div>
			<input type="password" class="form-control" placeholder="Password" bind:value={user.password}>
		</div>
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text">Repetir Password</span>
			</div>
			<input type="password" class="form-control" placeholder="Repetir Password" bind:value={user.pass2}>
		</div>

		<div style="display: flex; justify-content: flex-end; margin-top: 10px;">
			<div class="btn btn-success" on:click={saveProduct}>Guardar</div>
		</div>
	</div>
</div>