<script>
    import Modal from './modal.svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let treeName = 'Arbol';
    export let treePrice = 0;
    export let treeID = 0;

    let showModal = false;

    function display(event) {
        dispatch('cartDetail', event.detail);
    }

</script>


<style>

    .preview {
        width: 100%;
        height: 250px;
    }

    .arbol {
        background-color: #ffffff;
        padding: 10px;
        margin-top: 15px;
    }

    .botonarbol {
        margin-top: 10px;
    }

</style>

<div class="arbol">

        <img class="preview" src="https://viverolosencinos.com/wp-content/uploads/2018/05/principal.jpeg" alt="arbol" >

        <button class="btn btn-success botonarbol" on:click="{() => {showModal = true}}">Ver Arbol</button>

        {#if showModal}
        
        <Modal treeName={treeName} treePrice={treePrice} treeID={treeID} on:addToCart={display} on:close="{() => showModal = false}"/> 
        {/if}
</div>



    