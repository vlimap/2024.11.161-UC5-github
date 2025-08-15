const pagamentoService = require('../services/pagamento.service');
const express = require('express');
const router = express.Router();

module.exports = {
    async criarPagamento(req, res) {
        try {
            const pagamento = await pagamentoService.criarPagamento(req.body);
            res.status(201).json(pagamento);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async listarPagamentos(req, res) {
        try {
            const pagamentos = await pagamentoService.listarPagamentos();
            res.status(200).json(pagamentos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async buscarPagamentoPorId(req, res) {
        try {
            const pagamento = await pagamentoService.buscarPagamentoPorId(req.params.id);
            if (!pagamento) {
                return res.status(404).json({ error: 'Pagamento não encontrado' });
            }
            res.status(200).json(pagamento);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async atualizarPagamento(req, res) {
        try {
            const pagamentoAtualizado = await pagamentoService.atualizarPagamento(req.params.id, req.body);
            if (!pagamentoAtualizado) {
                return res.status(404).json({ error: 'Pagamento não encontrado' });
            }
            res.status(200).json(pagamentoAtualizado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deletarPagamento(req, res) {
        try {
            const deletado = await pagamentoService.deletarPagamento(req.params.id);
            if (!deletado) {
                return res.status(404).json({ error: 'Pagamento não encontrado' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default router;