const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('node_crud_api', 'blazhkos', '1617', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;
