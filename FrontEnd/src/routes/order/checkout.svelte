<script>
    import 'bootstrap/dist/css/bootstrap.css'
</script>

<style>
    .contacto{
        max-width: 960px;

    }
</style>

<svelte:head>
	<title>Checkout</title>
</svelte:head>


<div class="col-sm-8 offset-2 shadow p-3 mb-5 bg-white rounded">
    <div class="contacto">
        <div class="form-group">
            <label for="exampleFormControlInput1">Nonbre completo</label>
            <input type="nomcomp" class="form-control" id="exampleFormControlInput1" placeholder="Nombre Completo">
        </div>

        <div class="form-group">
            <label for="exampleFormControlInput1">Correo electrónico</label>
            <input type="email" class="form-control" id="exampleFormControlInput2" placeholder="ejemplo@ejemplo.com">
        </div>

        <div class="form-group">
        <div class = "row">
            <div class = "col-md-6">
                <label for="exampleFormControlInput1">Calle</label>
                <input type="direccion" class="form-control" id="exampleFormControlInput3" placeholder="Calle Principal">           
            </div>
            <div class = "col-md-6">
                <label for="exampleFormControlInput1">Número</label>
                <input type="numero" class="form-control" id="exampleFormControlInput4" placeholder="1234">                   
            </div>            
        </div>
        </div>

         <div class = "row">
            <div class = "col-md-6">
                <label for="exampleFormControlInput1">Colonia</label>
                <input type="direccion" class="form-control" id="exampleFormControlInput3" placeholder="Colonia Encino">           
            </div>
            <div class = "col-md-6">
                <label for="exampleFormControlInput1">Código Postal</label>
                <input type="numero" class="form-control" id="exampleFormControlInput4" placeholder="1234">                   
            </div>            
        </div>
        
    
        <div class="form-group">
            <label for="exampleFormControlInput1">Estado</label>
            <input type="direccion" class="form-control" id="exampleFormControlInput4" placeholder="1234 Calle Principal">
        </div>

        <div class="form-group">
            <label for="exampleFormControlInput1">Código Postal</label>
            <input type="direccion" class="form-control" id="exampleFormControlInput4" placeholder="654732">
        </div>

        <div class="row">
            <div class="col-sm-2 offset-10">
                <a class="btn btn-primary" style="color:#ffffff;">Continuar</a>
            </div>
        </div>

</div>

</div>



<footer class="page-footer font-small blue">
	<div class="footer-copyright text-center py-3">Viveros de los Santos © 2019
	</div>
</footer>


