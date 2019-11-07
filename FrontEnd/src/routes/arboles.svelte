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


	
</style>


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


