const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.obtenerTodosLosClientes);
router.get('/:cliente_id', userController.obtenerClientePorcliente_Id);
router.post('/', userController.crearCliente);
router.put('/:cliente_id', userController.actualizarCliente);
router.delete('/:cliente_id', userController.borrarCliente);

module.exports = router;
