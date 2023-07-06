const Sequelize = require('sequelize');
const db = require('../configs/Database');

const Users = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    diasFerias: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    dataReg: {
        type: Sequelize.DATE,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'users' // Specify the table name if it's different from the model name
});

module.exports = Users;
