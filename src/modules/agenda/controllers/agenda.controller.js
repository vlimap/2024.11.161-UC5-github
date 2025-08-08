import AgendaModel from '../models/agenda.model.js';

export default class AgendaController {
    static async cadastrar(requisicao, resposta){
        try {
            const { data, hora, cliente_id, colaborador_id, servico_id, status } = requisicao.body;
            if (!data || !hora || !cliente_id || !colaborador_id || !servico_id || !status) {
                return resposta.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
            }
            const agenda = await AgendaModel.create({
                data,
                hora,
                cliente_id,
                colaborador_id,
                servico_id,
                status
            });
            resposta.status(201).json(agenda);
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao criar agenda.", erro: error.message });
        }
    }
    static async listarTodos(requisicao, resposta){
        try {
            const agendas = await AgendaModel.findAll();
            if (agendas.length === 0) {
                return resposta.status(404).json({ mensagem: "Nenhum agendamento encontrado." });
            }
            resposta.status(200).json(agendas);
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar os agendamentos.", erro: error.message });
        }
    }
    static async listarPorId(requisicao, resposta){
        try {
            const { id } = requisicao.params;
            const agenda = await AgendaModel.findByPk(id);
            if (!agenda) {
                return resposta.status(404).json({ mensagem: "Agendamento não encontrado." });
            }
            resposta.status(200).json(agenda);
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar o agendamento.", erro: error.message });
        }
    }
    static async atualizar(requisicao, resposta){
        try {
            const { id } = requisicao.params;
            const { data, hora, cliente_id, colaborador_id, servico_id, status } = requisicao.body;
            const agenda = await AgendaModel.findByPk(id);
            if (!agenda) {
                return resposta.status(404).json({ mensagem: "Agendamento não encontrado." });
            }
            await agenda.update({
                data,
                hora,
                cliente_id,
                colaborador_id,
                servico_id,
                status
            }, { where: { id } }
            );
            resposta.status(200).json(agenda);
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao atualizar o agendamento.", erro: error.message });
        }
    }
    static async deletarPorId(requisicao, resposta){
        try {
            
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao criar perfil.", erro: error.message });
        }
    }
    static async deletar(requisicao, resposta){
        try {
            
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao criar perfil.", erro: error.message });
        }
    }
    static async total(requisicao, resposta){
        try {
            
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao criar perfil.", erro: error.message });
        }
    }
}