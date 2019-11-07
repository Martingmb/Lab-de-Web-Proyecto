<script>
    import { cartData } from "../subComponents/cartStore.js";
    let itemsList = []

    function processData(data) {
        console.log(data);
        itemsList = data;
    }

    const unsub = cartData.subscribe(data => {
        processData(data);
    })

</script>

<div class="container">
    <h1 class="title">CART</h1>
    <div class="notification">
        {#each itemsList as item}
        <p>{item}</p>
        <hr>
        {/each}
    </div>
</div>
