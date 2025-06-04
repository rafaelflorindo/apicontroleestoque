const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('nodeSequileze', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});
module.exports = sequelize;
//npm install mysql2