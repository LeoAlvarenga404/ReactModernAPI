const express = require('express');
const router = express.Router();
const estudoController = require('../controllers/estudoController');

// aqui eu posso definir qualquer rota que vai ser utilizada para chamar a função que eu criei

router.post('/', estudoController.criarEstudo);
router.delete('/:id/:userId', estudoController.deletarEstudo);
router.put('/:id/:userId', estudoController.atualizarEstudo);
router.get('/user/:userId', estudoController.obterTodosEstudos);
router.get('/:id/:userId', estudoController.obterEstudoPeloId);

module.exports = router;
