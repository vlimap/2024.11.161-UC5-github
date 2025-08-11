import express from 'express';
import AgendaController from '../controllers/agenda.controller.js';

const router = express.Router();

router.get('/agenda/total', AgendaController.total);
router.get('/agenda', AgendaController.listarTodos);
router.get('/agenda/:id', AgendaController.listarPorId);
router.post('/agenda/cadastrar', AgendaController.cadastrar);
router.put('/agenda/atualizar/:id', AgendaController.atualizar);
router.delete('/agenda/deletar/:id', AgendaController.deletarPorId);
router.delete('/agenda/deletar', AgendaController.deletar);

export default router;
