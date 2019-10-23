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



</style>

<section class="hero">
  <div class="hero-head">
    <nav class="navbar">
      <div class="container">
        <div class="navbar-menu">
          <div class="navbar-end">
            <a href="/loginPage" class="navbar-item">
              Inicio de Sesion
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
  <div class="hero-body">
    <div class="container has-text-centered">
      <h1 class="title title-font">
        Vivero de Los Santos
      </h1>

    </div>
  </div>
  <div class="hero-foot">
    <nav class="tabs is-boxed is-fullwidth">
      <div class="container">
        <ul>
          <li class="{inicioActive ? 'is-active' : ''}">
            <a href="." on:click={onclick}>Inicio</a>
          </li>
          <li class="{arbolesActive ? 'is-active' : ''}">
            <a href="/arboles" on:click={onclick}>Arboles</a>
          </li>
          <li class="{contactoActve ? 'is-active' : ''}">
            <a href="/contacto" on:click={onclick}>Contacto</a>
          </li>
        </ul>
      </div>
</section>