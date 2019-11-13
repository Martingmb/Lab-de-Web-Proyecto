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

    .hero {
        position: absolute;
        right: 0px;
    }

    

</style>

<section class="hero">
		<div class="hero-head">
		  <nav class="navbar">
			<div class="container">
			  <div class="navbar-menu">
				<div>
				  <a href="/loginPage" class="button btn btn-primary" on:click={sendMsg}>
					{buttonText}
				  </a>
				</div>
			  </div>
			</div>
		  </nav>
		</div>
</section>