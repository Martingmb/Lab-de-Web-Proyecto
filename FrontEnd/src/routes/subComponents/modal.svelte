<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let treeName = 'Arbol';
    export let treePrice = 0;
    export let treeID = 0;

    function addToCart() {
        dispatch('addToCart', {
            name: treeName,
            price: treePrice,
            id: treeID
        });
    }

</script>

<style>
    h1 {
        color: white;
    }
</style>


<div class="container">
    <div class="modal  is-active">
      <div class="modal-background" on:click='{() => dispatch("close")}'></div>
      <div class="modal-content">
        <div class="container">
            <div class="notification">
                <h3 class="title is-3">{treeName}</h3>
                <h3 class="title is-3">Precio: ${treePrice}</h3>
                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="arbol">
                <hr>
                <button class="button is-primary" on:click={addToCart}>Agregar a carrito</button>
                <button class="button is-danger" on:click='{() => dispatch("close")}'>Cerrar</button>
            </div>

        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" on:click='{() => dispatch("close")}'></button>
    </div>
</div>
