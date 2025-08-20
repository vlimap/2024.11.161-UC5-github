import express from "express";
import ColaboradorControler from "../controllers/colaborador.controllers";

const router = express.Router();

// Cadastrar usuário, listar todos e deletar todos
router.get("/colaborador", ColaboradorControler.listarTodos); // GET /colaborador
router.post("/colaborador", ColaboradorControler.cadastrar); // POST /colaborador
router.delete("/colaborador", ColaboradorControler.deletarTodos); // DELETE /colaborador

// Contar total de usuários
router.get("/colaboradores/total", ColaboradorControler.totalUsuarios); // GET /colaboradores/total

// Listar, atualizar e deletar usuário por ID
router.get("/colaborador/:id", ColaboradorControler.listarPorId); // GET /colaboradores/:id
router.patch("/colaborador/:id", ColaboradorControler.atualizar); // PATCH /colaboradores/:id
router.delete("/colaborador/:id", ColaboradorControler.deletarPorId); // DELETE /colaboradores/:id

export default router;