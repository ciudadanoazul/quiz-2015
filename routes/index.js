var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

// GET página de entrada.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

// Definición de rutas de /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

// GET página de autor. 
router.get('/author', function(req, res) {
  res.render('author');
});

module.exports = router;
