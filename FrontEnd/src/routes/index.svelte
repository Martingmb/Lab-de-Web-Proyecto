<script>
	import 'bulma/css/bulma.css';
	import Gallery from './subComponents/gallery.svelte';
	import Level from './subComponents/level.svelte'
</script>

<style>

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
</style>

<svelte:head>
	<title>Vivero de los Santos</title>
</svelte:head>


<h1 class="is-title">Vivero de los Santos</h1>

<div class="container">
  <div class="content is-large">
	<h4>Lorem Ipsum</h4>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </div>

</div>


<div class="container">
  <div class="notification">
  	<Level/>
  </div>
</div>


