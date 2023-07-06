const Sequelize = require('sequelize');
const db = require('../configs/Database');

const Tickets = db.define('tickets', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mensagem: {
        type: Sequelize.STRING,
        allowNull: false
    },
    datahora: {
        type: Sequelize.DATE,
        allowNull: false
    },
    estado: {
        type: Sequelize.STRING,
        allowNull: true
    },
    privacidade: {
        type: Sequelize.STRING,
        allowNull: true
    },
    id_user: {
        type:Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'tickets' // Specify the table name if it's different from the model name
})

module.exports = Tickets;