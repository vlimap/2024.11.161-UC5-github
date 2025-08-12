const pagamentoService = require('../services/pagamento.service'); // Importa o serviço de pagamento
const express = require('express'); // Importa o Express
const router = express.Router(); // Cria um roteador do Express

module.exports = {
    async criarPagamento(req, res) { // Controlador para criar um novo pagamento
        try {
            const pagamento = await pagamentoService.criarPagamento(req.body);
            res.status(201).json(pagamento);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async listarPagamentos(req, res) { // Controlador para listar todos os pagamentos
        try {
            const pagamentos = await pagamentoService.listarPagamentos();
            res.status(200).json(pagamentos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async buscarPagamentoPorId(req, res) { // Controlador para buscar um pagamento por ID
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
    
    async buscarPagamentosPorVendaId(req, res) { // Controlador para buscar pagamentos por ID de venda
        try {
            const pagamentos = await pagamentoService.buscarPagamentosPorVendaId(req.params.vendaId);
            if (!pagamentos || pagamentos.length === 0) {
                return res.status(404).json({ error: 'Nenhum pagamento encontrado para esta venda' });
            }
            res.status(200).json(pagamentos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async buscarPagamentosData(req, res) {  //
        try {
            const { dataInicio, dataFim } = req.query; // Obtém as datas do query string
            const pagamentos = await pagamentoService.buscarPagamentosData(dataInicio, dataFim);
            if (!pagamentos || pagamentos.length === 0) {
                return res.status(404).json({ error: 'Nenhum pagamento encontrado para este período' });
            }
            res.status(200).json(pagamentos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async atualizarPagamento(req, res) { // Controlador para atualizar um pagamento
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

    async deletarPagamento(req, res) { // Controlador para deletar um pagamento
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