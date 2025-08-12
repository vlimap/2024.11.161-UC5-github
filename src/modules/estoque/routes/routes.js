import express from "express";
import EstoqueController from "../controllers/estoque.controller.js";

const router = express.Router();

// Cadastrar um estoque
router.post("/cadastrar", EstoqueController.criar);

// Listar todos os estoques
router.get("/listar", EstoqueController.listarTodos);

// Listar estoque por id
router.get("/listar/:id", EstoqueController.listarPorId);

// Atualizar um estoque
router.patch("/atualizar/:id", EstoqueController.atualizar);

// Deletar estoque por id
router.delete("/deletar/:id", EstoqueController.deletarPorId);

// Deletar todos os estoques
router.delete("/deletar", EstoqueController.deletarTodos);


export default router;
