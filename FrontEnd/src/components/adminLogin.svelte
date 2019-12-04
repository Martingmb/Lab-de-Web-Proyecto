<script>
	import * as sapper from '@sapper/app';
	import { createEventDispatcher, onMount, afterUpdate } from "svelte";
    
	const dispatch = createEventDispatcher();
	export let buttonText = 'Iniciar Sesión';
	 
	afterUpdate(()=>{
		var auth = localStorage.getItem('auth');
		if(auth && auth!=null && location.pathname.startsWith('/admin')){
			buttonText = 'Cerrar sesión'
		}else{
			buttonText = 'Iniciar Sesión'
		}
	})

	function clickedLogin(){
		var auth = localStorage.getItem('auth');
		if(auth && auth!=null && location.pathname.startsWith('/admin')){
			localStorage.setItem('auth', null);
		}
		sapper.goto('admin/login')
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
	.hero .button{
		cursor: pointer;
	}
</style>

<section class="hero">
	<div class="hero-head">
		<nav class="navbar">
			<div class="container">
				<div class="navbar-menu">
					<div>
						<div href="/admin/login" class="button btn btn-primary" on:click={clickedLogin}>
							{buttonText}
						</div>
					</div>
				</div>
			</div>
		</nav>
	</div>
</section>