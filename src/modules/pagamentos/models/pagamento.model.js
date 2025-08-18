const { DataTypes } = require('sequelize'); // Importa os tipos de dados do Sequelize
const sequelize = require('../../../config/database.js'); // Importa a instância do Sequelize

const Pagamento = sequelize.define('Pagamento', { // Define o modelo Pagamento
    
    venda_id: { // Chave estrangeira para a tabela de vendas
        type: DataTypes.UUID, // Tipo UUID gerador automaticamente pelo banco
        allowNull: false, // Não permite valores nulos
        references: { // Define a referência para a tabela de vendas
        model: 'Vendas', // Nome da tabela de vendas
        key: 'id' // Coluna referenciada na tabela de vendas
        },
    },

    tipo_pagamento: { // Tipo de pagamento 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            isIn: [['cartao', 'dinheiro', 'pix']] // Valida se o tipo de pagamento é um dos valores permitidos
        }
    },
    // Valor do pagamento com duas casas decimais
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true // Valida se o valor é um número decimal
        }
    },
    // Status do pagamento (pendente, pago, cancelado)
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['pendente', 'pago', 'cancelado']] // Valida se o status é um dos valores permitidos
        }
    },
    data_pagamento: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW // Define a data do pagamento como a data atual por padrão
    }
}, {
    // Opções do modelo
     tableName: 'clientes',
     createdAt: 'criado_em',
     updatedAt: 'atualizado_em'
   
});

module.exports = Pagamento;