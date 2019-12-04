<script context="module">
	let product_id;
	export async function preload(page, session){
		const { id } = page.params;
		product_id = id;
	}
</script>


<script>
	import * as sapper from '@sapper/app';
	import { onMount } from 'svelte';

	let product = {

	};
	let auth = false;
	let edited = false;
	let sending = false;

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

		getProduct();

		document.getElementById('image').onchange = function(e){
			toBase64(this.files[0]).then(img=>{
				saveImage(img);
			})
		}
	});

	const url_get = 'http://localhost:2020/admin/products/get';
	const url_edit = 'http://localhost:2020/admin/products/edit';
	const url_img = 'http://localhost:2020/admin/products/image';

	function getProduct(){
		fetch(url_get, {
			method: 'POST',
			body: JSON.stringify({ token: auth.token, id: product_id }),
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
				product = res.data;
			})
		}).catch(err=>{
			alert("Error consiguiendo el producto.");
		})
	}

	function saveProduct(){
		if(!product) return;
		product.description = document.getElementById('description').value;
		product.available = document.getElementById('available').checked

		var sv = document.getElementById('siempreverde').checked
		var rojo = document.getElementById('rojo').checked
		if(!sv && !rojo){
			alert("Favor de seleccionar una categoría.");
			return;
		}
		if(sv && rojo){
			alert("Favor de seleccionar solo una categoría.");
			return;
		}
		product.information = {
			origin: product.origin,
			zone: product.zone,
			height: product.height,
			growth: product.growth,
			type: product.type,
			soil: product.soil,
			water: product.water,
			uses: product.uses
		}
		edited = false;
		
		fetch(url_edit, {
			method: 'POST',
			body: JSON.stringify({
				...product,
				id: product._id,
				siempreverde: sv,
				rojo: rojo,
				token: auth.token
			}),
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
				edited = res.data.edited;
			})
		}).catch(err=>{
			alert("Error editando el producto.");
		})
	}

	function selectImage(){
		document.getElementById('image').click();
	}

	function saveImage(data){
		sending = true;
		edited = false;
		console.log(JSON.stringify({
				id: product_id,
				image: data,
				token: auth.token
			}))
		fetch(url_img, {
			method: 'POST',
			body: JSON.stringify({
				id: product_id,
				image: data,
				token: auth.token
			}),
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
				edited = res.data.edited;
				product.image = data
			})
		}).catch(err=>{
			alert("Error editando el producto.");
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
</style>

<svelte:head>
	<title>Editar Producto - Vivero Admin</title>
</svelte:head>

<div class="messages">
	{#if edited}
	<div class="alert alert-success" style="margin-top: 10px;">
		Se ha editado el producto.
	</div>
	{/if}
	{#if sending}
	<div class="alert alert-info" style="margin-top: 10px;">
		Enviado imagen...
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
			<input type="text" class="form-control" placeholder="Origen" bind:value={product.origin}>
		</div>
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text">Zona</span>
			</div>
			<input type="text" class="form-control" placeholder="Zona" bind:value={product.zone}>
		</div>
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text">Altura</span>
			</div>
			<input type="text" class="form-control" placeholder="Altura" bind:value={product.height}>
		</div>
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text">Crecimiento</span>
			</div>
			<input type="text" class="form-control" placeholder="Crecimiento" bind:value={product.growth}>
		</div>
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text">Tipo</span>
			</div>
			<input type="text" class="form-control" placeholder="Tipo" bind:value={product.type}>
		</div>
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text">Suelo</span>
			</div>
			<input type="text" class="form-control" placeholder="Suelo" bind:value={product.soil}>
		</div>
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text">Agua</span>
			</div>
			<input type="text" class="form-control" placeholder="Agua" bind:value={product.water}>
		</div>
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text">Usos</span>
			</div>
			<input type="text" class="form-control" placeholder="Usos" bind:value={product.uses}>
		</div>
		<div style="display: flex; justify-content: flex-end; margin-top: 10px;">
			<div class="btn btn-success" on:click={saveProduct}>Guardar</div>
		</div>
	</div>
</div>