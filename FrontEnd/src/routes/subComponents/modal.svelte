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
                <div class="columns">
                  <div class="column">
                    <h3 class="title is-3">{treeName}</h3>
                    <h3 class="title is-3">Precio: ${treePrice}</h3>
                    <img src="https://viverolosencinos.com/wp-content/uploads/2018/05/principal.jpeg" alt="arbol">
                    <hr>
                  </div>
                  <div class="column">
                        <h3 class="title is-3">Información Encino Siempre Verde</h3>
                        <p> <strong>Nombre Científico:</strong> Quercus Virginiana </p>
                        <p> <strong>Origen:</strong> Sur de Estados Unidos y Norte </p>
                        <p> <strong>Zona:</strong> 6 a 10 </p>
                        <p> <strong>Altura:</strong> Hasta 20m </p>
                        <p> <strong>Crecimiento:</strong> Moderado a rapido </p>
                        <p> <strong>Tipo de arbol:</strong> Copa redonda muy frondoso </p>
                        <p> <strong>Suelo:</strong> Cualquier Tipo </p>
                        <p> <strong>Temperatura:</strong> -20 a 40°C </p>
                        <p> <strong>Agua:</strong> Riego abundante, espaciados de 7 a 15 días </p>
                        <p> <strong>Usos:</strong> Madera resistente para la elaboración de pisos y sus frutas para alimento de la fauna silvestre.Las raíces producen tubérculos comestibles. </p>
                        <hr>
                        <button class="button is-primary" on:click={addToCart}>Agregar a carrito</button>
                        <button class="button is-danger" on:click='{() => dispatch("close")}'>Cerrar</button>
                  </div>
                </div>
            </div>

        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" on:click='{() => dispatch("close")}'></button>
    </div>
</div>
