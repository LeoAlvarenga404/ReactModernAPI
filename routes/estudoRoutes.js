const express = require('express');
const router = express.Router();
const estudoController = require('../controllers/estudoController');

router.post('/', estudoController.createEstudo);

router.delete('/:id/:userId', estudoController.deleteEstudo);

router.put('/:id/:userId', estudoController.updateEstudo);

router.get('/user/:userId', estudoController.getAllEstudos);

router.get('/:id/:userId', estudoController.getEstudoById);

module.exports = router;
