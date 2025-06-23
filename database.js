const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('controleEstoqueSenac', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});
module.exports = sequelize;
//npm install mysql2