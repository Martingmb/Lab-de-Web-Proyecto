<script>
    import * as sapper from '@sapper/app';
    function gotoPage() {
        sapper.goto('adminPage')
    }

</script>


<div class="container">
  <div class="notification">

    <div class="field">
      <label class="label">Usuario</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input is-success" type="text" placeholder="Usuario">
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
        <input class="input is-success" type="password" placeholder="Contrasena">
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
        <button class="button is-link" on:click={gotoPage}>Iniciar Sesion</button>
      </div>
    </div>

  </div>
</div>

