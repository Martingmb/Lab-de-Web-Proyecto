<script>
    import Productos from "./subComponents/productos.svelte";
	import Menu from "./subComponents/asideMenu.svelte";
	import Notification from "./subComponents/notification.svelte";
	import { treeData } from "./subComponents/cartStore.js";
	import * as sapper from "@sapper/app";

	import 'bulma/css/bulma.css'
    import 'bootstrap/dist/css/bootstrap.css'
	import Level from './subComponents/level.svelte'
	import { onMount } from 'svelte';
    
    function process(event) {
		console.log("Arboles");
		console.log(event.detail);
		treeData.update(tree => {
			tree.treeName = event.detail.treeName;
			tree.treePrice = event.detail.treePrice;
			tree.treeID = event.detail.treeID;
			return tree;
		})
	}

</script>

<style>
</style>

<nav class="navbar navbar-expand-lg navbar-light bg-light" id ="navContainer3">
        <a class="navbar-brand" href="#"></a>
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

<h1>Encino Rojo</h1>

<div class="container is-fluid">
    <div class="notification">
      <div class="container">
          <div class="notification">
              <strong>Catalogo</strong> de arboles disponibles en nuestro vivero.
          </div>
          <Notification/>
      </div>
  
      <hr>
  
      <div class="columns">
  
      <div class="column is-one-fifth">
          <div class="notification">
              <Menu/>
          </div>
      </div>
      <div class="column">
          <div class="pagination">
              <Productos on:addToCart={process}/>
          </div>
      </div>
      </div>
    </div>
  </div>