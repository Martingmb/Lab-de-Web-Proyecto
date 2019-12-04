<script>
  let name = '';
  let tel = '';
  let email = '';
  let comentario = '';

  function handleClick() {

    if(email == '' || name == '' || comentario == '') {
      alert('¡Necesitas rellenar todos los campos!');
    } else {
      alert('¡Gracias por tus comentarios!');
    }

  }

</script>

<style>


  .contacto {
    background-color: #f5f5f5;
    padding:75px;top: 50%;
    -webkit-animation: fadein 3s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 3s; /* Firefox < 16 */
        -ms-animation: fadein 3s; /* Internet Explorer */
         -o-animation: fadein 3s; /* Opera < 12.1 */
            animation: fadein 3s;
  }

	@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
	}

	/* Firefox < 16 */
	@-moz-keyframes fadein {
		from { opacity: 0; }
		to   { opacity: 1; }
	}

	/* Safari, Chrome and Opera > 12.1 */
	@-webkit-keyframes fadein {
		from { opacity: 0; }
		to   { opacity: 1; }
	}

  .gmaps {
    height:100%;    
    -webkit-animation: fadein 5s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 5s; /* Firefox < 16 */
        -ms-animation: fadein 5s; /* Internet Explorer */
         -o-animation: fadein 5s; /* Opera < 12.1 */
            animation: fadein 5s;
  }

  .formadecontacto {
    margin: 15px;
  }

  .titulocontacto {
    font-size: 20px;
    margin-bottom: 15px;
  }

  .notification {
    background-color: none !important;
  }

  .titulocontacto {
    text-align: center;
    font-size: 30px;
    font-family: Raleway, Arial, Helvetica, sans-serif;
    font-weight: bold;
    padding-bottom: 15px;
    color: #000000;
  }

  .linea {
    border:1px solid gray;
    margin-bottom: 20px;
  }

  .infocontacto {
    padding: 15px;
    color: black;
    text-align: center; 
    text-align: center;
  }

  .botoncontacto {
    text-align: right;
    position: absolute;
    right:15px;
  }

</style>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#"></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="." on:click={onclick}>Inicio</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/arboles" on:click={onclick}>Arboles</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="/contacto" on:click={onclick}>Contacto</a>
          </li>
          
        </ul>
      </div>
    </nav>

<section class="contacto">
  <div class="container">

    <div class="row">
      <div class="col-sm-12">
          <h1 class="titulocontacto">Contacto</h1>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-2 offset-sm-5 linea" style="">
      </div>
    </div>

    <div class="row">
          <div class="col-sm-12">
            <p class="infocontacto">Ponte en contacto con nosotros.</p>
          </div>
    </div>


    <div class="row formadecontacto">
      <div class="col-sm-6"> 
          <div class="field">
              <div class="control">
                <input class="input" type="text" placeholder="Nombre" bind:value={name}>
               </div>
          </div>
          <div class="field">
              <div class="control">
                <input class="input" type="text" placeholder="Telefono" bind:value={tel}>
              </div>
          </div>           
          <div class="field">
              <div class="control">
                <input class="input" type="email" placeholder="Correo Electrónico" bind:value={email}>
              
              </div>
          </div>
          <div class="field">
            <textarea class="textarea" placeholder="Dejanos tus comentarios" bind:value={comentario}></textarea>
          </div>


        <button class="btn btn-primary botoncontacto" type="submit" on:click={handleClick}>Enviar</button>

      </div>
      <div class="col-sm-6">
        <iframe class="gmaps" src= "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28815.797537515813!2d-100.20473231599998!3d25.472520511191355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662c8c0c7fdb341%3A0x22eddf316bb17a4e!2sEl%20Barrial%2C%2067300%20Santiago%2C%20Nuevo%20Leon!5e0!3m2!1sen!2smx!4v1573689974585!5m2!1sen!2smx" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="">
        </iframe>
      </div>
    </div>
  </div>
</section>
    
    
    
    <footer class="page-footer font-small blue">
      <div class="footer-copyright text-center py-3">Viveros de los Santos © 2019
      </div>
    </footer>

