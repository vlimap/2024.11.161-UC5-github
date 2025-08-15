import express from "express";
import ServicoController from "../controllers/servico.controller";

const router = express.Router();

router.post("/servico/cadastrar", ServicoController.cadastrar);
router.get("/servicos", ServicoController.listarTodos);
router.get("/servico/:id", ServicoController.listarPorId);
router.patch("/servico/atualizar/:id", ServicoController.atualizar);
router.delete("/servico/deletar/:id", ServicoController.deletarPorId);
router.delete("/servicos", ServicoController.deletarTodos);

export default router;