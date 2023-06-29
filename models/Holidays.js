const Sequelize = require('sequelize');
const db = require('../configs/Database');

const Holidays = db.define('holidays', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    notas: {
        type: Sequelize.STRING,
        allowNull: false
    },
    start_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    end_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    id_user: {
        type:Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'holidays' // Specify the table name if it's different from the model name

})