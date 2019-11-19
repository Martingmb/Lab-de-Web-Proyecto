<script>
	import Productos from "./subComponents/productos.svelte";
	import Menu from "./subComponents/asideMenu.svelte";
	import Notification from "./subComponents/notification.svelte";
	import { treeData } from "./subComponents/cartStore.js";

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

.cateogriasarboles {
	padding: 75px;
    background-color: #f5f5f5;
    color:#ffffff;
}

.titulocategorias {
	text-align: center;
	font-size: 30px;
	font-family: Raleway, Arial, Helvetica, sans-serif;
	font-weight: bold;
	padding-bottom: 15px;
	color: #000000;
}

.linea {
	border:1px solid gray;
	margin-bottom: 20px;
}

.categoriasinfo {
	padding: 15px;
	color: black;
	text-align: center; 
	text-align: center;
}

.unacategoria {
	height: 200px;
	background-color: black;
	padding: 50px;
}

.unacategoria > p {
	position: absolute;
	margin-left: auto;
	margin-right: auto;
	left:0;
	right:0;
	text-align: center;
	bottom: 40px;
}

.encinosiempreverde {
	background: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url('https://arboleselectos.mx/wp-content/uploads/2019/07/Encino-Siempre-Verde-1.jpg');
    background-size: cover;
    background-repeat: no-repeat;
}

.encinorojo {
	background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('https://viverolosencinos.com/wp-content/uploads/2017/12/ENCINO-ROJO-5P-5.5-ALTURA-1150x863.jpg');
    background-size: cover;
    background-repeat: no-repeat;
}

.botonarboles {
	position: absolute;
	margin-left: auto;
	margin-right: auto;
	left:0;
	right:0;
	text-align: center;
	bottom: 10px;
}
	
</style>


<nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#"></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="." on:click={onclick}>Inicio</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/arboles" on:click={onclick}>Arboles</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/contacto" on:click={onclick}>Contacto</a>
          </li>
          
        </ul>
      </div>
    </nav>

<section class="cateogriasarboles">
	<div class="container">

		<div class="row">
			<div class="col-sm-12">
				<h1 class="titulocategorias">Categorias</h1>
			</div>
		</div>

		<div class="row">
			<div class="col-sm-2 offset-sm-5 linea" style="">
			</div>
		</div>

		<div class="row">
			<div class="col-sm-12">
				<p class="categoriasinfo">Descubre los beneficios de comprar un árbol.</p>		
			</div>
		</div>


		<div class="row">
			<div class="col-sm-3 offset-sm-2 unacategoria encinosiempreverde">
				<p>Encino Siempreverde</p>
				<button class="btn btn-success botonarboles" type="submit">Ver Categoria</button>
			</div>

			<div class="col-sm-3 offset-sm-2 unacategoria encinorojo">
				<p>Encino Rojo</p>
				<button class="btn btn-success botonarboles" type="submit">Ver Categoria</button>
			</div>
		</div>
	</div>
</section>
<!--
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
-->

