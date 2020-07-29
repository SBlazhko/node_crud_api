const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Car = sequelize.define('car', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    brand: Sequelize.STRING,
    model: Sequelize.STRING,
    year: Sequelize.INTEGER,
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

module.exports = Car;
