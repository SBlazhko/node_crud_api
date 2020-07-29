const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USERNAME}`, `${process.env.DB_PASSWORD}`, {
//     host: `${process.env.DB_HOST}`,
//     dialect: 'postgres'
// });
const sequelize = new Sequelize('postgresql://blazhkos:1617@10.15.80.3/node-crud-app')

module.exports = sequelize;
