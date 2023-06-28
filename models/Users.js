const Sequelize = require('sequelize');
const db = require('../configs/Database');

const Users = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primarykey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {timestamps: false})

module.exports = Users;