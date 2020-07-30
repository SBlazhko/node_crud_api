const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(`node-crud-app`, `blazhkos`, `1617`, {
    host: `/cloudsql/sblazhko-node-crud-app:europe-west2:node-crud-app`,
    dialect: 'postgres'
});

module.exports = sequelize;
