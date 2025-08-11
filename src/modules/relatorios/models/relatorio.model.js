import { DataTypes } from "sequelize";
import sequelize from "../../../../config/database";

const relatorioModel = sequelize.define("Relatorio", {
  tipo_relatorio: {
    type: DataTypes.ENUM("venda_diaria", "venda_mensal", "venda_anual"),
    allowNull: false,
    validate: {
      isIn: {
        args: [["venda_diaria", "venda_mensal", "venda_anual"]],
        msg: "Tipo de Relatório Invalido!",
      },
    },
  },
  parametros: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [1],
        msg: "O parâmetro deve ser maior que zero!",
      },
    },
  },
  data_geracao: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: {
        args: true,
        msg: "A data de geração deve ser uma data válida!!",
      },
    },
  },
});

export default relatorioModel;
