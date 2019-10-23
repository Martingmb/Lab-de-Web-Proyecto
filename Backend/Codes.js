function Code(code, message){
	return { code, message };
}

module.exports = {
	unexpectedError: Code(001, 'Unexpected error.'),
	missingInfo: Code(002, 'Falta información para la llamada.'),

	incorrectLogin: Code(100, 'Usuario o contraseña incorrecta.'),
	invalidToken: Code(101, 'Token de usuario invalida.'),

	errorCreatingUser: Code(200, 'Error creando usuario.'),
	cannotDeleteSelf: Code(201, 'No te puedes eliminar a ti mismo.'),
	userDeleted: Code(202, 'El usuario se ha eliminado.'),
	noUser: Code(203, 'El usuario no se encontró.'),

	noProduct: Code(300, 'El producto solicitado no existe.'),

	cartUnavailableProduct: Code(400, 'Uno o mas productos ya no se encuentra disponible.'),
	invalidOrder: Code(401, 'Creación de orden invalida.'),
	noOrder: Code(402, 'La orden no existe.'),
	cantUpdatePaidOrder: Code(403, 'No se puede modificar una orden ya pagada.')
}