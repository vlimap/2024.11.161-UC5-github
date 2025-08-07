import { DataTypes } from "sequelize";
import sequelize from "../../../config/database.js";

/**
 * Modelo de Produto para uma barbearia.
 * Pode representar serviços (ex: corte, barba) ou produtos físicos (ex: pomada, shampoo).
 */
const ProdutoModel = sequelize.define(
  "Produto",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 100],
          msg: "O nome do serviço/produto deve ter entre 2 e 100 caracteres.",
        },
        notEmpty: {
          msg: "O campo nome é obrigatório.",
        },
        is: {
          args: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]+$/,
          msg: "O nome não pode conter caracteres especiais.",
        },
      },
    },
    preco: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      validate: {
        isDecimal: {
          msg: "O preço deve estar no formato decimal. Exemplo: 39.90",
        },
        isNumeric: {
          msg: "O preço deve ser um número.",
        },
        isPositivo(value) {
          if (value <= 0) {
            throw new Error("O preço deve ser maior que zero.");
          }
        },
      },
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [20, 50],
          msg: "A descrição do serviço/produto deve ter entre 20 e 50 caracteres.",
        },
      },
    },
  },
  {
    tableName: "produto",
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  }
);

export default ProdutoModel;
