<script>
	import * as sapper from '@sapper/app';
	let username = '', password = '';
	
	const url = 'http://localhost:2020/admin/login';
	function login(){
		fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				email: username,
				password: password
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response=>{
			response.json().then(res=>{
				console.log(res);
				if(res.error){
					alert(res.error.message);
					return;
				}
				localStorage.setItem('auth', JSON.stringify(res.data));
				sapper.goto('admin')
			})
		}).catch(err=>{
			alert("Error haciendo login.");
		})
	}

</script>

<style>
	.container{
		max-width: 500px;
		margin: auto;
		margin-top: 20px;
	}
	.container .notification{
		padding: 20px;
	}
</style>


<div class="container">
  <div class="notification">
		<div class="field">
			<label class="label">Usuario</label>
			<div class="control has-icons-left has-icons-right">
				<input class="input is-success" type="text" bind:value={username} placeholder="Usuario">
				<span class="icon is-small is-left">
					<i class="fas fa-user"></i>
				</span>
				<span class="icon is-small is-right">
					<i class="fas fa-check"></i>
				</span>
			</div>
    	</div>

		<div class="field">
			<label class="label">Contrasena</label>
			<div class="control has-icons-left has-icons-right">
				<input class="input is-success" type="password" bind:value={password} placeholder="Contraseña">
				<span class="icon is-small is-left">
					<i class="fas fa-lock"></i>
				</span>
				<span class="icon is-small is-right">
					<i class="fas fa-check"></i>
				</span>
			</div>
		</div>

		<div class="field is-grouped">
			<div class="control">
				<button class="button is-link" on:click={login}>Iniciar Sesion</button>
			</div>
		</div>
  	</div>
</div>