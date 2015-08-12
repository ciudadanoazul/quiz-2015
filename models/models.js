var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

// Cargar el Modelo ORM
var Sequelize = require('sequelize');

//  Usar BBDD SQLite o Postgres dependiendo si estamos trabajando
// en entorno de desarrollo local o en despliegue en heroku

var sequelize = new Sequelize(DB_name, user, pwd,
		{ dialect: protocol,
		  protocol: protocol,
		  port: port,
		  host: host,
		  storage: storage, // solo SQLite (.env)
		  omitNull: true // solo Postgres
		}
	);

//  Usar BBDD SQLite
//
//var sequelize = new Sequelize(null, null, null,
//						{dialect: "sqlite", storage: "quiz.sqlite"}
//					);

// Importar la definición de la tabla Quiz que definimos en quiz.js

var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Importar la definición de la tabla Comment que definimos en comment.js

var Comment = sequelize.import(path.join(__dirname, 'comment'));

// Configurar Relaciones entre tablas

Comment.belongsTo(Quiz); // Un comentario solo puede pertenecer a una pregunta
Quiz.hasMany(Comment); // Una pregunta puede tener muchos comentarios

// Exportar la definición de la tabla Quiz

exports.Quiz = Quiz;

// Exportar la definición de la tabla Comment

exports.Comment = Comment;

// Crear e inicializar Base de Datos

sequelize.sync().then(function() {
	// then(...) ejecuta el manejador una vez creada la tabla

	Quiz.count().then(function(count) {
		if (count === 0) {
			// Inicializar la tabla solo si está vacía
			Quiz.create({pregunta: 'Quién ganó la Primer Liga en 2011-12',
						 respuesta: 'el Manchester City',
						 tema: 'ocio'
						});

			Quiz.create({pregunta: 'Qué es Javascript',
						 respuesta: 'Un lenguaje de programación',
						 tema: 'tecnologia'
						});

			Quiz.create({pregunta: 'Capital de Italia',
						 respuesta: 'Roma',
						 tema: 'Humanidades'
					 });
			Quiz.create({pregunta: 'Capital de Portugal',
						 respuesta: 'Lisboa',
						 tema: 'Humanidades'
	 				 }).then(function(){
								console.log('Base de datos inicializada')});
		};
	});
});
