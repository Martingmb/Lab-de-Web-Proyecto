<script>
    import 'bulma/css/bulma.css'
    import 'bootstrap/dist/css/bootstrap.css'
	import Level from './subComponents/level.svelte'
	import { onMount } from 'svelte';

	// Vanilla JavaScript Scroll to Anchor
// @ https://perishablepress.com/vanilla-javascript-scroll-anchor/


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
    :global(body) {
        /* this will apply to <body> */
        /* your styles go here */
		
        
    }

	html {
		scroll-behavior: smooth;
		overflow-x: hidden;
	}

	.module {
  scroll-behavior: auto
	}	

	body{
		scroll-behavior: smooth
	}
    .pidearbol {
    	padding: 75px;
    	background-color: #f5f5f5;
    	color:#ffffff;
		
    }

    .nosotros {
    	padding: 75px;
    	background-color: #ffffff;
		
    }


	@font-face {
		font-family: Lora;
		src: url(https://fonts.gstatic.com/s/lora/v14/0QIhMX1D_JOuMw_LLPtLp_A.woff2) format('woff2');
	}

	h1, figure, p, h7 {
		text-align: center;
		margin: 0 auto;
		color: white;
	}

	h1 {
		font-size: 2.8em;
		font-family: Lora, serif;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
		color: white;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	h4 {
		color:#ffffff;
		font-family: Lora, serif;
	}

	.textColor {
		color: #ffffff;
	}

	p {
		margin: 1em auto;
		color: white;
		font-family: Lora, serif;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}

	.titulopidearbol {
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

	.nuestrosservicios {
		padding: 15px;
		color: black;
		text-align: center; 
		text-align: center;
		scroll-behavior: smooth
	}

	.cuadros {
		padding: 15px;
	}

	.adentro {
		padding: 40px;
		background-color: white;
		text-align: center; 
		text-align: center;
	}

	.adentro > p{
		color:black;
	}

	.adentro > h7{
		color:black;
	}

	.col {
		display: block;
    	width: 100%;
		height: 100%;
	}

	.bannerinicio {
    height: 100vh;
    background-image: url('https://cdn.shopify.com/s/files/1/0326/7189/files/Untitled_design_7_43cf7dc1-f9f4-4a90-87f6-51e2dfe0040f_2000x.png?v=1563973681');
    background-size: cover;
    background-repeat: no-repeat;
	
	
  }


  .titulo {
    text-align: center;
    margin:auto;
    color:#ffffff;
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

  .boton {
  	margin: 10px auto 0px auto;
  	display: block;
  }

  .textobotoninicio {
  	color:#ffffff;
  }

</style>

<svelte:head>
	<title>Vivero de los Santos</title>
</svelte:head>



<section class="bannerinicio">
		<div class="textoinicio">
  			<h1 class="titulo">Viveros De Los Santos</h1>
  			<h5 class="titulo">Los mejores expertos en crecimiento de arboles</h5>

  			<button class="btn btn-success boton" type="submit"><a class="textobotoninicio scroll" href="#navbarNav">¡Conócenos!</a></button>
  		</div>

</section>



<nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand scroll" href="#"></a>
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


<section id="infoarboles" class="pidearbol">
		<div class="container">
			<div class="row">

				<div class="col-sm-12">
					<h1 class="titulopidearbol">¡Pide tu Árbol ya!</h1>
				</div>
			</div>
			<div class="row">

				<div class="col-sm-2 offset-sm-5 linea" style="">
				</div>
			</div>


			<div class="row">
				<div class="col-sm-12">
					<p class="nuestrosservicios">Descubre los beneficios de comprar un árbol.</p>
				</div>
			</div>

				<div class = "container-fluid">
					<div class="row">
						<div class="col-sm-3 cuadros">
							<div class="adentro">
								<h7>Árboles de calidad</h7>
								<p>Cultivados con cuidado desde el 2015</p>
							</div>
						</div>

						<div class="col-sm-3 cuadros">
							<div class="adentro">
								<h7>Nostros lo plantamos</h7>
								<p>Vamos a tu casa a plantar tu árbol</p>
							</div>
						</div>
		
						<div class="col-sm-3 cuadros">
							<div class="adentro">
								<h7>Pago en Línea</h7>
								<p>Con nuestro portal puedes pagar en línea</p>
							</div>
						</div>

						<div class="col-sm-3 cuadros">
							<div class="adentro">
								<h7>Pago en efectivo</h7>
								<p>Paga al momento de recibirlo en tu casa</p>
							</div>
						</div>
						
					</div>				
				</div>
				
		</div>
</section>

<section class="nosotros">
	<div class="container">
		<div class="row">

				<div class="col-sm-12">
					<h1 class="titulopidearbol">¿Quiénes Somos</h1>
				</div>
			</div>
			<div class="row">

				<div class="col-sm-2 offset-sm-5 linea" style="">
				</div>
			</div>


			<div class="row">
				<div class="col-sm-12">
					<p class="nuestrosservicios">Empresa dedicada al crecimiento de árboles.</p>
				</div>
			</div>

			<div class="row">
				<div class="col-sm-4">
				</div>
				<div class="col-sm-4">
				</div>
				<div class="col-sm-4">
				</div>
			</div>
	</div>

	
</section>


<footer class="page-footer font-small blue">
	<div class="footer-copyright text-center py-3">Viveros de los Santos © 2019
	</div>
</footer>


