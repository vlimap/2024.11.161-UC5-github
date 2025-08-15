import relatorioModel from "../models/relatorio.model.js";

class RelatorioController {
  static async gerarRelatorio(req, res) {
    try {
      const { tipo_relatorio, parametros } = req.body;

      const novoRelatorio = await relatorioModel.create({
        tipo_relatorio,
        parametros,
        data_geracao: new Date(),
      });
      res.status(201).json(novoRelatorio);
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  static async listarRelatorios(req, res) {
    try {
      const relatorios = await relatorioModel.findAll();
      if (relatorios.length === 0) {
        return res
          .status(200)
          .json({ mensagem: "Sem relatorios a serem exibidos!!" });
      }
      res.status(200).json(relatorios);
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }
}

export default RelatorioController;
