<script>
    import * as sapper from '@sapper/app';
    import { get } from "svelte/store";
    import { treeData, cartData } from "./cartStore.js";

    export let data = [];
    let badgeNumber = data.length;

    function process(arr) {
        console.log("Notification", arr);
        const value = get(treeData);
        console.log("Con get de svelte", value);
        console.log("DATA antes de actualizar data", data);
        data.push(arr);
        console.log("DATA antes de actualizar cart", data);
        badgeNumber = data.length - 1;
        cartData.update(cart => {
            console.log("Cart Data cuando se actualiza", cart.data);
            cart.data = [... cart.data, value];
            console.log("DESPUES", cart.data);
            cart.quantity = badgeNumber;
            return cart;
        })
    }

    const unsub = treeData.subscribe(tree => {
        process(tree);
    })


    function noItems() {
        alert("There is no items in the cart");
    }

    function goToCart() {
        sapper.goto('cart');
    }


</script>

<style>

    i {
        cursor: pointer;
    }

	.notification {
		text-decoration: none;
		padding: 15px 26px;
		position: relative;
		display: inline-block;
		border-radius: 2px;
	}

	.notification .badge {
		position: absolute;
		top: -10px;
		right: -10px;
		padding: 5px 10px;
		border-radius: 50%;
		background: red;
		color: white;
	}

	.container {
		background-color: whitesmoke;
		border-radius: 1em;
	}
</style>

{#if badgeNumber == 0}
    <i class="fas fa-shopping-cart notification" on:click={noItems}></i>
{:else}
    <i class="fas fa-shopping-cart notification" on:click={goToCart}><span class="badge">{badgeNumber}</span></i>
{/if}