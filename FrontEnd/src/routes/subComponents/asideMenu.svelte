<script>
	export let sort;
</script>

<style>

.menu-label {
	font-weight: bold;
	padding-left: 25px;
}

.boton {
	margin-left: 25px;
}

</style>

<aside class="menu">
	<div class="container">
		<div class="btn btn-primary boton" on:click={sort(0)}>Precio mas bajo a mas alto</div>
		<div class="btn btn-primary boton" on:click={sort(1)}>Precio mas alto a mas bajo</div>
	</div>
</aside>