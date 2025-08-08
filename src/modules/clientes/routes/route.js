import express from 'express';
import ClienteController from '../controllers/controller.js';

const router = express.Router();

router.post('/cliente/cadastrar', ClienteController.criar);

router.get('/clientes', ClienteController.listarTodos);

router.get('/cliente/listar/:id', ClienteController.ListarPorId);

router.patch('/cliente/atualizar/:id', ClienteController.atualizar);

router.delete('/cliente/deletar/:id', ClienteController.deletarPorId);

export default router;
