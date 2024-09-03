const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


// aqui eu posso definir qualquer rota que vai ser utilizada para chamar a função que eu criei
router.post('/register', authController.criarUsuario);
router.post('/login', authController.loginUsuario);
router.get('/', authController.obterTodosUsuarios);

// tem q exportar esse router para ser usado no index.js
module.exports = router;
