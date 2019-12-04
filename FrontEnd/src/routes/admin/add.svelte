<script>
	import * as sapper from '@sapper/app';
	import { onMount } from 'svelte';

	let product = {
		name: '',
		description: '',
		cost: '',
		available: true,
		amount: -1,
		category: {
			siempreverde: false,
			rojo: false
		},
		information: {
			origin: '',
			zone: '',
			height: '',
			growth: '',
			type: '',
			soil: '',
			water: '',
			uses: ''
		}
	}

	let sending = false;
	let errMsg = false;
	let auth;

	const toBase64 = file => new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});

	onMount(()=>{
		var a = localStorage.getItem('auth');
		if(!a || a==null){
			sapper.goto('admin/login')
		}
		auth = JSON.parse(a);

		document.getElementById('image').onchange = function(e){
			toBase64(this.files[0]).then(img=>{
				product.image = img;
			})
		}
	});

	function saveProduct(){
		if(product.name.length<5 || isNaN(product.cost)){
			errMsg = 'Favor de llenar por lo menos el nombre y costo.'
			return
		}

		product.available = document.getElementById('available').checked
		product.category.siempreverde = document.getElementById('siempreverde').checked
		product.category.rojo = document.getElementById('rojo').checked

		if(!product.category.siempreverde && !product.category.rojo){
			errMsg = 'Favor de seleccionar una categoría'
			return
		}
		if(product.category.siempreverde && product.category.rojo){
			errMsg = 'Favor de seleccionar solo una categoría'
			return
		}
		errMsg = false;

		const url = 'http://localhost:2020/admin/products/add';
		fetch(url, {
			method: 'POST',
			body: JSON.stringify({ token: auth.token, ...product }),
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
				sapper.goto('admin/product/'+res.data.id);
			})
		}).catch(err=>{
			alert("Error haciendo login.");
		})
	}

	function selectImage(){
		document.getElementById('image').click();
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
	<title>Agregar Producto - Vivero Admin</title>
</svelte:head>

<div class="header">
	Agregar Producto
</div>
<div class="messages">
	{#if sending}
		<div class="alert alert-info" style="margin-top: 10px;">
			Agregando producto...
		</div>
	{/if}
	{#if errMsg}
		<div class="alert alert-danger" style="margin-top: 10px;">
			{errMsg}
		</div>
	{/if}
</div>
<div class="container">
	<div class="left">
		{#if !product || !product.image}
			<img src="https://via.placeholder.com/150" width="150" height="150" alt="productImage">
		{:else}
			<img src="{product.image}" width="150" height="150" alt="productImage">
		{/if}
		<button class="button" on:click={selectImage}>Cambiar imagen</button>
	</div>
	<input type="file" name="image" id="image" style="display: none;" accept="image/*">
	<div class="right">
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text">Nombre</span>
			</div>
			<input type="text" class="form-control" placeholder="Nombre" bind:value={product.name}>
		</div>
		
		<label>Descripción</label>
		<div class="input-group mb-3">
			<textarea class="form-control" id="description">{product.description}</textarea>
		</div>
		
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text">Costo</span>
			</div>
			<input type="number" class="form-control" placeholder="Costo" bind:value={product.cost}>
		</div>
		<div class="form-check">
			<input class="form-check-input" type="checkbox" value="1" id="available" checked='{product.available}'>
			<label class="form-check-label" for="defaultCheck1">
				Disponible
			</label>
		</div>
		<hr>
		<div style="font-size: 20px; font-weight: 600;">Categoría</div>
		<div class="form-check">
			<input class="form-check-input" type="checkbox" id="siempreverde" checked='{(product && product.category) ? product.category.siempreverde : false}'>
			<label class="form-check-label" for="siempreverde">
				Encino Siempreverde
			</label>
		</div>
		<div class="form-check">
			<input class="form-check-input" type="checkbox" id="rojo" checked='{(product && product.category) ? product.category.rojo : false}'>
			<label class="form-check-label" for="rojo">
				Encino Rojo
			</label>
		</div>
		
		<hr>
		<div style="font-size: 20px; font-weight: 600;">Información</div>
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text">Origen</span>
			</div>
			<input type="text" class="form-control" placeholder="Origen" bind:value={product.information.origin}>
		</div>
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text">Zona</span>
			</div>
			<input type="text" class="form-control" placeholder="Zona" bind:value={product.information.zone}>
		</div>
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text">Altura</span>
			</div>
			<input type="text" class="form-control" placeholder="Altura" bind:value={product.information.height}>
		</div>
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text">Crecimiento</span>
			</div>
			<input type="text" class="form-control" placeholder="Crecimiento" bind:value={product.information.growth}>
		</div>
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text">Tipo</span>
			</div>
			<input type="text" class="form-control" placeholder="Tipo" bind:value={product.information.type}>
		</div>
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text">Suelo</span>
			</div>
			<input type="text" class="form-control" placeholder="Suelo" bind:value={product.information.soil}>
		</div>
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text">Agua</span>
			</div>
			<input type="text" class="form-control" placeholder="Agua" bind:value={product.information.water}>
		</div>
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text">Usos</span>
			</div>
			<input type="text" class="form-control" placeholder="Usos" bind:value={product.information.uses}>
		</div>

		<div style="display: flex; justify-content: flex-end; margin-top: 10px;">
			<div class="btn btn-success" on:click={saveProduct}>Guardar</div>
		</div>
	</div>
</div>