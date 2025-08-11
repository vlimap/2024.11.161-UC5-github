const { DataTypes } = require('sequelize'); // Importa os tipos de dados do Sequelize
const sequelize = require('../../../database/connection'); // Importa a instância do Sequelize

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
        allowNull: false
    },
    // Valor do pagamento com duas casas decimais
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    // Status do pagamento (pendente, pago, cancelado)
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_pagamento: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    // Opções do modelo
    tableName: 'pagamentos',
    timestamps: false
});

module.exports = Pagamento;