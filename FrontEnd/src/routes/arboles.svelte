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
		console.log("Tree Data", event.detail);
		treeData.update(tree => {
			tree.treeName = event.detail.treeName;
			tree.treePrice = event.detail.treePrice;
			tree.treeID = event.detail.treeID;
			return tree;
		})
	}

	function onClickSV() {
		sapper.goto('/siempreVerde');
	}

	function onClickR() {
		sapper.goto('/rojo');
	}

	 onMount(() => {
		(function() {
		scrollTo();
	})();
		function scrollTo() {
			const links = document.querySelectorAll('.scroll');
			links.forEach(each => (each.onclick = scrollAnchors));
		}

		function scrollAnchors(e, respond = null) {
			const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
			e.preventDefault();
			var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
			const targetAnchor = document.querySelector(targetID);
			if (!targetAnchor) return;
			const originalTop = distanceToTop(targetAnchor);
			window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
			const checkIfDone = setInterval(function() {
				const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
				if (distanceToTop(targetAnchor) === 0 || atBottom) {
					targetAnchor.tabIndex = '-1';
					targetAnchor.focus();
					window.history.pushState('', '', targetID);
					clearInterval(checkIfDone);
				}
			}, 100);
		}
 })

</script>


<style>

	.categoriasarboles {
		padding: 75px;
		background-color: #f5f5f5;
		color:#ffffff;
	}

	.catArbol {
		padding: 40px;
  
	}

	.titulocategorias {
		text-align: center;
		font-size: 30px;
		font-family: Raleway, Arial, Helvetica, sans-serif;
		font-weight: bold;
		padding-bottom: 15px;
		color: #000000;
	}

	.titulo {
    text-align: center;
    margin:auto;
    color:#ffffff;
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

	.bannerinicio {
    height: 100vh;
    background-image: url('https://searchengineland.com/figz/wp-content/seloads/2014/11/evergreen-ss-1920-800x450.jpg');
    background-size: cover;
    background-repeat: no-repeat;
	
  }

  .boton {
  	margin: 10px auto 0px auto;
  	display: block;
  }


  .textoinicio {
  	position: relative;
  	top: 50%;
  	transform: translateY(-50%);
 	 -webkit-animation: fadein 3s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 3s; /* Firefox < 16 */
        -ms-animation: fadein 3s; /* Internet Explorer */
         -o-animation: fadein 3s; /* Opera < 12.1 */
            animation: fadein 3s;
  }

	@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
	}

	/* Firefox < 16 */
	@-moz-keyframes fadein {
		from { opacity: 0; }
		to   { opacity: 1; }
	}

	/* Safari, Chrome and Opera > 12.1 */
	@-webkit-keyframes fadein {
		from { opacity: 0; }
		to   { opacity: 1; }
	}

  .textobotoninicio {
  	color:#ffffff;
  }

  h1, figure, p, h7 {
		text-align: center;
		margin: 0 auto;
		color: white;
	}

	h1 {
		font-size: 4em;
		font-family: Lora, serif;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
		color: white;
	}
	
</style>

<section class="bannerinicio">
		<div class="textoinicio">
  			<h1 class="titulo">Viveros De Los Santos</h1>
  			<h5 class="titulo">Los mejores expertos en crecimiento de arboles</h5>

  			<button class="btn btn-success boton" type="submit"><a class="textobotoninicio scroll" href="#beneficios">Nuestros árboles</a></button>
  		</div>
	
</section>


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

<section class="categoriasarboles">
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
				<p id = "beneficios" class="categoriasinfo">Descubre los beneficios de comprar un árbol.</p>		
			</div>
		</div>


		<div class="row">
			<div class="col-sm-3 offset-sm-2 unacategoria encinosiempreverde">
				<button class="btn btn-success botonarboles" type="submit" on:click={onClickSV}>Ver Encino Siempreverde</button>
			</div>

			<div class="col-sm-3 offset-sm-2 unacategoria encinorojo">
				<button class="btn btn-danger botonarboles" type="submit" on:click={onClickR}>Ver Encino Rojo</button>
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

