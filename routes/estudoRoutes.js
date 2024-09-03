const express = require('express');
const router = express.Router();
const { criarEstudo, deletarEstudo, atualizarEstudo, obterTodosEstudos, obterEstudoPeloId } = require('../controllers/estudoController');

// aqui eu posso definir qualquer rota que vai ser utilizada para chamar a função que eu criei

router.post('/', criarEstudo);
router.delete('/:id/:userId', deletarEstudo);
router.put('/:id/:userId', atualizarEstudo);
router.get('/user/:userId', obterTodosEstudos);
router.get('/:id/:userId', obterEstudoPeloId);

module.exports = router;
