<script>
	import Productos from "./subComponents/productos.svelte";
	import Pagination from "./subComponents/Pagination.svelte";
	import Menu from "./subComponents/asideMenu.svelte";
	import Notification from "./subComponents/notification.svelte";
	import * as sapper from "@sapper/app";

	import 'bulma/css/bulma.css'
	import 'bootstrap/dist/css/bootstrap.css'
	import Level from './subComponents/level.svelte'
	import { onMount } from 'svelte';


	let cart_count = 0;

	onMount(()=>{
		var c = localStorage.getItem('cart');
		if(c && c!=null){
			c = JSON.parse(c);
			cart_count = c.length;
		}
	})

	function cartCountChange(e){
		cart_count = e.detail
	}
</script>

<style>
	.titulocategorias {
		text-align: center;
		font-size: 30px;
		font-family: Raleway, Arial, Helvetica, sans-serif;
		font-weight: bold;
		padding-bottom: 10px;
		color: #ffffff;
		margin-top: 25px;
  	}

  	.linea {
		border:1px solid white;
		margin-bottom: 20px;
  	}

  	.categoriasinfo {
		padding: 15px;
		color: #ffffff;
		text-align: center; 
		text-align: center;
  	}

  	.categoriasarboles {
		height: 100%;
		background-image: url('https://images.pond5.com/beautiful-green-leaves-and-bright-footage-012096746_prevstill.jpeg');
		background-size: cover;
		background-repeat: no-repeat;
  	}

  	.notification {
   	background-color: none !important;
 	}
</style>


<nav class="navbar navbar-expand-lg navbar-light bg-light" id ="navContainer3">
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
  
	<div class="collapse navbar-collapse" id="navbarNav2">
		<ul class="navbar-nav">
			<li class="nav-item">
				<a class="nav-link" href="." on:click={onclick}>Inicio</a>
			</li>
			<li class="nav-item active">
				<a class="nav-link" href="/arboles" on:click={onclick}>Arboles</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="/contacto" on:click={onclick}>Contacto</a>
			</li>
		</ul>
	</div>
</nav>


<section class="categoriasarboles">
  	<div class="row">
		<div class="col-sm-12">
			<h1 class="titulocategorias">Encino Rojo</h1>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-2 offset-sm-5 linea"></div>
	</div>
	<div class="row">
		<div class="col-sm-12">
			<p id = "beneficios" class="categoriasinfo">Todos nuestros Encinos Rojos.</p>    
		</div>
	</div>
				  
	<div class="container is-fluid">
      <div class="container">
          	<div class="row">
					<div class="col-sm-6"></div>
					<div class="offset-sm-4 col-sm-2">
						<Notification data={cart_count} />
					</div>
          	</div>
      </div>
      <div class="columns">
			<div class="column">
				<div class="pagination">
					<Pagination on:cartCount={cartCountChange}/>
				</div>
			</div>
		</div>
  	</div>
</section>


