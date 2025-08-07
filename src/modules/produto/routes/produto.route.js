import express from "express";
import ProdutoController from "../controllers/produto.controller.js";

const router = express.Router();

// Listar todos os serviços/produtos da barbearia
router.get("/produtos", ProdutoController.listarTodos);

// Buscar por ID
router.get("/produtos/:id", ProdutoController.listarPorId);

// Cadastrar serviço/produto
router.post("/produto/cadastrar", ProdutoController.cadastrar);

// Atualizar serviço/produto
router.patch("/produto/atualizar/:id", ProdutoController.atualizar);

// Deletar por ID
router.delete("/produto/deletar/:id", ProdutoController.deletarPorId);

// Deletar todos
router.delete("/produtos", ProdutoController.deletarTodos);

export default router;
