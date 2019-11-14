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
    	background-image: url('https://i.ytimg.com/vi/MqH8WtR5hWs/maxresdefault.jpg');
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
		margin-bottom: 20px;
	}

	.nuestrosservicios {
		padding: 15px;
		color: white;
		background-color: rgba(0, 0, 0, 0.6);
		text-align: center; 
		text-align: center;
	}

	.cuadros {
		padding: 15px;
	}

	.adentro {
		padding: 40px;
		background-color: rgba(0, 0, 0, 0.6);
		text-align: center; 
		text-align: center;
	}

	.adentro > p{
		color:white;
	}

	.adentro > h1{
		color:white;
	}

	.col {
		display: block;
    	width: 100%;
		height: 100%;
	}

	.jumbotron{
		background-image: url("https://cdn.pixabay.com/photo/2019/08/26/10/10/leaf-4431306_1280.jpg");
  		background-size: cover;
		height: 100%;
	}

</style>

<svelte:head>
	<title>Vivero de los Santos</title>
</svelte:head>



<section class="pidearbol">
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
						<p class="nuestrosservicios">Nuestros servicios son faciles y accesibles</p>
					</div>
				</div>
				<div class = "container-fluid">
					<div class="row">
						<div class="col-sm-3 cuadros">
							<div class="adentro">
								<h7>Paga en Línea</h7>
								<p>Con nuestro portal puedes pagar en línea</p>
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
								<h7>Pago en efectivo</h7>
								<p>Paga al momento de recibirlo en tu casa</p>
							</div>
						</div>

						<div class="col-sm-3 cuadros">
							<div class="adentro">
								<h7>Árboles de calidad</h7>
								<p>Cultivados con cuidado desde el 2015</p>
							</div>
						</div>
						
					</div>				
				</div>
				
		</div>
</section>

<section class = "nosotros">
	<div class="jumbotron">
		<h1 class="display-4">Sobre nosotros</h1>
		<p class="lead">Cultivamos árboles de alta calidad desde el 2015.</p>
		<p>Estamos comprometidos con el medio ambiente.</p>
		<p>Creemos que un árbol en cada hogar puede hacer toda la diferencia.</p>
	</div>
</section>


<footer class="page-footer font-small blue">
	<div class="footer-copyright text-center py-3">Viveros de los Santos © 2019
	</div>
</footer>


