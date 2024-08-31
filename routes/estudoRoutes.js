const express = require('express');
const router = express.Router();
const { createEstudo, deleteEstudo, updateEstudo, getAllEstudos, getEstudoById } = require('../controllers/estudoController');

router.post('/', createEstudo);

router.delete('/:id', deleteEstudo);

router.put('/:id', updateEstudo);

router.get('/', getAllEstudos);

router.get('/:id', getEstudoById);

module.exports = router;
