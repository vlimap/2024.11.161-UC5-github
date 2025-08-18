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
            }, { where: { id } });
            resposta.status(200).json(agenda);
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao atualizar o agendamento.", erro: error.message });
        }
    }
    static async deletarPorId(requisicao, resposta){
        try {
            const { id } = requisicao.params;
            const agenda = await AgendaModel.findByPk(id);
            if(!agenda) {
                return resposta.status(404).json({ mensagem: "Agendamento não encontrado." });
            }
            await agenda.destroy({ where: { id } });
            resposta.status(204).json({ mensagem: "Agendamento deletado com sucesso." });
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao deletar o agendamento.", erro: error.message });
        }
    }
    static async deletar(requisicao, resposta){
        try {
            await AgendaModel.destroy({ truncate: true });
            resposta.status(204).json({ mensagem: "Todos os agendamentos foram deletados com sucesso." });
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao deletar os agendamentos.", erro: error.message });
        }
    }
    static async total(requisicao, resposta){
        try {
            const totalAgendamentos = await AgendaModel.count();
            if (totalAgendamentos === 0) {
                return resposta.status(404).json({ mensagem: "Nenhum agendamento encontrado." });
            }
            resposta.status(200).json({ total_de_agendamentos: totalAgendamentos });
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao contar os agendamentos.", erro: error.message });
        }
    }
}