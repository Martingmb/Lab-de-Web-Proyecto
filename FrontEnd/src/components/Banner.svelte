<script>
	let inicioActive = true;
	let arbolesActive = false;
	let contactoActve = false;
	function onclick() {
		if(this.text == 'Inicio') {
			arbolesActive = contactoActve = false;
			inicioActive = true;
		} else if(this.text == 'Arboles') {
			inicioActive = contactoActve = false;
			arbolesActive = true;
		} else {
			inicioActive = arbolesActive = false;
			contactoActve = true;
		}
	}
</script>

<style>
	.title-font {
		font-family: 'Lora', serif;
	}
	
	section {
		background-color: white;
	}
</style>






