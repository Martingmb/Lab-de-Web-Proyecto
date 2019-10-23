<script>

	import Productos from "./subComponents/productos.svelte";
	import Menu from "./subComponents/asideMenu.svelte";

</script>


<style>


	
</style>


<div class="container is-fluid">
  <div class="notification">
	<div class="container">
		<div class="notification">
			<strong>Catalogo</strong> de arboles disponibles en nuestro vivero.
		</div>
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
			<Productos/>
		</div>
	</div>
	</div>
  </div>
</div>


