<script>
    import { createEventDispatcher } from "svelte";
    
    const dispatch = createEventDispatcher();
    export let buttonText = 'Inicio de Sesion';

    function sendMsg() {
        dispatch('message', {
            clicked: true
        });
    }



</script>


<style>
    .navbar-end {
        background-color: white;
    }

    section {
        padding-bottom: 0.24cm;
    }

</style>

<section class="hero">
		<div class="hero-head">
		  <nav class="navbar">
			<div class="container">
			  <div class="navbar-menu">
				<div class="navbar-end">
				  <a href="/loginPage" class="navbar-item" on:click={sendMsg}>
					{buttonText}
				  </a>
				</div>
			  </div>
			</div>
		  </nav>
		</div>
</section>