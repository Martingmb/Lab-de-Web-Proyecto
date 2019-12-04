<script>
    import { cartData } from "../subComponents/cartStore.js";
    import { get } from "svelte/store";
    let itemsList = []

    function processData(data) {
        console.log("Arboles", data);
        itemsList = data.data;
    }

    const value = get(cartData);

    processData(value);

</script>

<div class="container">
    <h1 class="title">CART</h1>
    <div class="notification">
        <table class="table">
          <thead>
            <tr>
                <th><abbr title="Nombre">Nombre</abbr></th>
                <th><abbr title="Precio">Precio</abbr></th>
            </tr>
          </thead>
          <tfoot>
            <tr>
                <th><abbr title="Nombre">Nombre</abbr></th>
                <th><abbr title="Precio">Precio</abbr></th>
            </tr>
          </tfoot>
          <tbody>
            {#each itemsList as item}
              <tr>
                <td>{item.name}</td>
                <td>{item.price}</td>    
              </tr>
            {/each}
          </tbody>
        </table>
    </div>
</div>
