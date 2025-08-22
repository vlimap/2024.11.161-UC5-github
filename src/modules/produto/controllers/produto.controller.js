import ProdutosModel from '../models/produto.model.js';
import EstoqueModel from '../../estoque/models/estoque.model.js';
import { Op } from "sequelize";

class ProdutosController {

  // Criar produto
  static async cadastrar(req, res) {
    try {
      const { nome, marca, preco, quantidade_estoque, descricao, categoria } = req.body;

      if (!nome || !marca || !preco || quantidade_estoque === undefined || !descricao || !categoria) {
        return res.status(400).json({
          mensagem: "Campos obrigatórios: nome, marca, preco, quantidade_estoque, descricao e categoria."
        });
      }

      if (quantidade_estoque < 0) {
        return res.status(400).json({ mensagem: "Quantidade em estoque não pode ser negativa." });
      }

      const produto = await ProdutosModel.create({ nome, marca, preco, quantidade_estoque, descricao, categoria });
      res.status(201).json({ mensagem: "Produto cadastrado com sucesso!", produto });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao cadastrar produto.", erro: error.message });
    }
  }

  // Listar todos os produtos
  static async listarTodos(req, res) {
    try {
      const produtos = await ProdutosModel.findAll();
      if (!produtos || produtos.length === 0) {
        return res.status(200).json({ mensagem: "Nenhum produto encontrado." });
      }
      res.status(200).json(produtos);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao listar produtos.", erro: error.message });
    }
  }

  // Listar produto por ID
  static async listarPorId(req, res) {
    try {
      const { id } = req.params;
      const produto = await ProdutosModel.findByPk(id);
      if (!produto) {
        return res.status(404).json({ mensagem: "Produto não encontrado." });
      }
      res.status(200).json(produto);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao buscar produto.", erro: error.message });
    }
  }

  // Atualizar produto por ID
  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, marca, preco, quantidade_estoque, descricao, categoria } = req.body;

      if (!nome || !marca || !preco || quantidade_estoque === undefined || !descricao || !categoria) {
        return res.status(400).json({
          mensagem: "Campos obrigatórios para atualização: nome, marca, preco, quantidade_estoque, descricao e categoria."
        });
      }

      if (quantidade_estoque < 0) {
        return res.status(400).json({ mensagem: "Quantidade em estoque não pode ser negativa." });
      }

      const resultado = await ProdutosModel.update(
        { nome, marca, preco, quantidade_estoque, descricao, categoria },
        { where: { id } }
      );

      if (resultado[0] === 0) {
        return res.status(404).json({ mensagem: "Produto não encontrado para atualização." });
      }

      res.status(200).json({ mensagem: "Produto atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao atualizar produto.", erro: error.message });
    }
  }

  // Deletar produto por ID
  static async deletarPorId(req, res) {
    try {
      const { id } = req.params;
      const resultado = await ProdutosModel.destroy({ where: { id } });
      if (!resultado) {
        return res.status(404).json({ mensagem: "Produto não encontrado para exclusão." });
      }
      res.status(200).json({ mensagem: "Produto excluído com sucesso!" });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao excluir produto.", erro: error.message });
    }
  }

  // Buscar produto por nome ou marca
  static async buscarPorNomeOuMarca(req, res) {
    try {
      const { nome, marca } = req.query;
      const whereClause = {};

      if (nome) whereClause.nome = { [Op.like]: `%${nome}%` };
      if (marca) whereClause.marca = { [Op.like]: `%${marca}%` };

      const resultados = await ProdutosModel.findAll({ where: whereClause });

      if (!resultados || resultados.length === 0) {
        return res.status(200).json({ mensagem: "Nenhum produto encontrado com os filtros fornecidos." });
      }

      res.status(200).json(resultados);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao buscar produtos.", erro: error.message });
    }
  }

  // Movimentar estoque do produto
  static async movimentarEstoque(req, res) {
    try {
      const { id } = req.params;
      const { tipo, quantidade } = req.body; // tipo = 'entrada' ou 'saida'

      if (!tipo || quantidade === undefined) {
        return res.status(400).json({ mensagem: "Campos obrigatórios: tipo e quantidade." });
      }

      const produto = await ProdutosModel.findByPk(id);
      if (!produto) return res.status(404).json({ mensagem: "Produto não encontrado." });

      let novaQuantidade = produto.quantidade_estoque;
      if (tipo === 'entrada') novaQuantidade += quantidade;
      else if (tipo === 'saida') novaQuantidade -= quantidade;

      if (novaQuantidade < 0) {
        return res.status(400).json({ mensagem: "Estoque insuficiente para a saída." });
      }

      await ProdutosModel.update({ quantidade_estoque: novaQuantidade }, { where: { id } });

      // Registrar movimentação no EstoqueModel
      await EstoqueModel.create({ produto_id: id, quantidade, tipo });

      res.status(200).json({ mensagem: "Estoque movimentado com sucesso.", quantidade_estoque: novaQuantidade });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao movimentar estoque.", erro: error.message });
    }
  }

  // Deletar todos os produtos
  static async deletarTodos(req, res) {
    try {
      await ProdutosModel.destroy({ truncate: true });
      res.status(200).json({ mensagem: "Todos os produtos foram deletados!" });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }
}

export default ProdutosController;
