const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/connection');

const Pagamento = sequelize.define('Pagamento', {
    
    venda_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
        model: 'Vendas', // Nome da tabela de vendas
        key: 'id'
        },
    },

    tipo_pagamento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_pagamento: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'pagamentos',
    timestamps: false
});

module.exports = Pagamento;