const Sequelize = require('sequelize');
module.exports = new Sequelize('DBAllterra','BDDev','Dev1234',{
    host: 'DESKTOP-3A5S3MH',
    port: 1433,
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: false,
        },
    },
});