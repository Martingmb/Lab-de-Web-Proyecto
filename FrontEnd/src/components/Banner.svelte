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

  .fotobanner {
    height: 400px;
    background-image: url('https://cdn.shopify.com/s/files/1/0326/7189/files/Untitled_design_7_43cf7dc1-f9f4-4a90-87f6-51e2dfe0040f_2000x.png?v=1563973681');
    background-size: cover;
    background-repeat: no-repeat;
  }
  
  .title-font {
    font-family: 'Lora', serif;
  }

  section {
    background-color: white;
  }

</style>

    <section class="hero">

      <div class="row">
        <div class="col-sm-12 fotobanner">
        </div>
      </div>


      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#"></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="." on:click={onclick}>Inicio</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/arboles" on:click={onclick}>Arboles</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/contacto" on:click={onclick}>Contacto</a>
          </li>
          
        </ul>
      </div>
    </nav>
      
      
    </section>
