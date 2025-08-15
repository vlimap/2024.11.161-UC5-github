import { DataTypes } from "sequelize";
import sequelize from "../../../../config/database.js";

//Campos: cliente_id, colaborador_id, data, itens_venda, valor_total, pagamento_id

const VendasModel = sequelize.define(
  "Vendas",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    client_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "clientes",
        key: "id",
      },
      validate: {
        notEmpty: { msg: "O cliente_id é obrigatório!" },
        isUUID: { args: 4, msg: "cliente_id deve ser um UUID válido!" },
      },
    },
    colaborador_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "colaboradores",
        key: "id",
      },
      validate: {
        notEmpty: { msg: "O colaborador_id é obrigatório!" },
        isUUID: { args: 4, msg: "colaborador_id deve ser um UUID válido!" },
      },
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: { msg: "A data é obrigatória!" },
        isDate: { msg: "A data deve ser válida!" },
      },
    },
    itens_venda: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Os itens da venda são obrigatórios!" },
        isValidJson(value) {
          if (!Array.isArray(value) || value.length === 0) {
            throw new Error("itens_venda deve ser um array JSON não vazio!");
          }
        },
      },
    },
    valor_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: { msg: "O valor total é obrigatório!" },
        isDecimal: { msg: "O valor total deve ser decimal!" },
        min: {
          args: [0],
          msg: "O valor total deve ser maior ou igual a zero!",
        },
      },
    },
    pagamento_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "pagamentos",
        key: "id",
      },
      validate: {
        notEmpty: { msg: "O pagamento_id é obrigatório!" },
        isUUID: { args: 4, msg: "pagamento_id deve ser um UUID válido!" },
      },
    },
  },
  {
    tableName: "vendas",
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  }
);

export default VendasModel;
