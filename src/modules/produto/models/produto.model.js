import { DataTypes } from "sequelize";
import sequelize from "../../../config/database.js";

/**
 * Modelo de Produto ou Serviço para barbearia.
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
          msg: "O nome deve ter entre 2 e 100 caracteres.",
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
    marca: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [2, 100],
          msg: "A marca deve ter entre 2 e 100 caracteres.",
        },
      },
    },
    preco: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
      validate: {
        isDecimal: {
          msg: "O preço deve estar no formato decimal (ex: 39.90).",
        },
        min: {
          args: [0.01],
          msg: "O preço deve ser maior que zero.",
        },
      },
    },
    quantidade_estoque: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: {
          args: [0],
          msg: "A quantidade em estoque não pode ser negativa.",
        },
      },
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [20, 255],
          msg: "A descrição deve ter entre 20 e 255 caracteres.",
        },
      },
    },
    tipo: {
      type: DataTypes.ENUM("produto", "serviço"),
      allowNull: false,
      validate: {
        isIn: {
          args: [["produto", "serviço"]],
          msg: "O tipo deve ser 'produto' ou 'serviço'.",
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
