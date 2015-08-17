// La gestión de usuarios es muy simplista y se basa en tener
// 2 usuarios registrados predefinidos en la variable users.
// En un portal real suele haber una tabla de gestion de usuarios.

var users = {admin: {id:1, username:"admin", password:"1234"},
			paul:  {id:2, username:"paul", password:"5678"}
		   };

// Comprueba si el usuario está registrado en users
// Si autenticación falla o hay errores se ejecuta callback(error).

exports.autenticar = function(login, password, callback) {
	if (users[login]) {
		if (password == users[login].password) {
			callback(null, users[login]);
		} else {
			callback(new Error('Contraseña errónea.'));
		}
	} else {
		callback(new Error('No existe el usuario.'));
	}
};
