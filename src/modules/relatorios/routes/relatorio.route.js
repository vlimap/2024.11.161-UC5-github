import express from "express";
import RelatorioController from "../controllers/relatorio.controller.js";

const router = express.Router();

router.post("/relatorios/vendas-mensais", RelatorioController.gerarRelatorio);
router.get("/relatorios", RelatorioController.listarRelatorios);

export default router;
