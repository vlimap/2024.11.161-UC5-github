import express from "express";
import VendasController from "./controller/vendas.controller.js";

const router = express.Router();

// Rotas para operações em todas as vendas
router.get("/vendas", VendasController.listarTodos);      // Listar todas as vendas
router.post("/vendas", VendasController.registrar);       // Cadastrar nova venda
router.delete("/vendas", VendasController.deletarTodos);  // Deletar todas as vendas

// Rotas para operações em uma venda específica
router.get("/vendas/:id", VendasController.listarPorId);      // Obter venda por ID
router.patch("/vendas/:id", VendasController.atualizar);      // Atualizar venda por ID
router.delete("/vendas/:id", VendasController.deletarPorId);  // Deletar venda por ID

export default router;
