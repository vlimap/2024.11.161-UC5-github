import express from "express";
import PagamentoController from "../controllers/pagamento.controller.js";

const router = express.Router();

// Listar todos os pagamento
router.get("/pagamento", PagamentoController.listarTodos);

// Listar pagamento por id
router.get("/pagamento/:id", PagamentoController.listarPorId);

// Cadastrar um pagamento
router.post("/pagamento/cadastrar", PagamentoController.cadastrar);

// Atualizar um pagamento
router.patch("/pagamento/atualizar/:id", PagamentoController.atualizar);

// Deletar pagamento por id
router.delete("/pagamento/deletar/:id", PagamentoController.deletarPorId);

// Deletar todos os pagamento
router.delete("/pagamento/deletar", PagamentoController.deletarTodos);

// Total pagamento
router.get("/pagamento/total", PagamentoController.totalProdutos)

export default router;