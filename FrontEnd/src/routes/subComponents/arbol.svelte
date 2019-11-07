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
        width: 20%;
        height: 20%;
    }

</style>

<img class="preview" src="https://bulma.io/images/placeholders/1280x960.png" alt="arbol" on:click="{() => {showModal = true}}">

<h3 class="title is-3">Arbol</h3>

{#if showModal}
    <Modal treeName={treeName} treePrice={treePrice} treeID={treeID} on:addToCart={display} on:close="{() => showModal = false}"/> 
{/if}
    