<script>
    import 'bulma/css/bulma.css'
    import 'bootstrap/dist/css/bootstrap.css'
    import Level from './subComponents/level.svelte'
</script>

<style>

    :global(body) {
        /* this will apply to <body> */
        /* your styles go here */
        
    }

    .pidearbol {
    	padding: 75px;
    	background-color: #f5f5f5;
    	/*background-image: url('https://i.ytimg.com/vi/MqH8WtR5hWs/maxresdefault.jpg');*/
    }


	@font-face {
		font-family: Lora;
		src: url(https://fonts.gstatic.com/s/lora/v14/0QIhMX1D_JOuMw_LLPtLp_A.woff2) format('woff2');
	}

	h1, figure, p {
		text-align: center;
		margin: 0 auto;
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
		color:floralwhite;
		font-family: Lora, serif;
	}

	.textColor {
		color: floralwhite;
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
	}

	.linea {
		border:1px solid;
	}

	.nuestrosservicios {
		padding-top: 15px;
		color: black;
	}

	.cuadros {
		border: 1px solid;
		padding: 25px;
	}

	.adentro {
		padding: 25px;
		background-color: white;
		text-align: center;
	}

	.adentro > p{
		color:black;
	}

</style>

<svelte:head>
	<title>Vivero de los Santos</title>
</svelte:head>



	<section class="pidearbol">
		<div class="container">
			<div class="row">

				<div class="col-sm-12">
					<h1 class="titulopidearbol" style="color:black;">¡Pide tu Árbol ya!</h1>
				</div>
			</div>
			<div class="row">

				<div class="col-sm-2 offset-sm-5 linea" style="">
				</div>
			</div>


				<div class="row">
					<div class="col-sm-4 offset-sm-4">
						<p class="nuestrosservicios">Nuestros servicios son faciles y accesibles</p>
					</div>
				</div>

				<div class="row">
					<div class="col-sm-4 cuadros">
						<div class="adentro">
							<h7>Paga en Línea</h7>
							<p>Con nuestro portal puedes pagar en línea facilmente desde tu hogar</p>
						</div>
					</div>

					<div class="col-sm-4 cuadros">
					</div>
	 
					<div class="col-sm-4 cuadros">
					</div>

					
				</div>

		</div>
	</section>



		<footer class="page-footer font-small blue">

		  <div class="footer-copyright text-center py-3">Viveros de los Santos © 2019
		  </div>

		</footer>


