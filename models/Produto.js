// models/Produto.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Produto = sequelize.define("Produto", {
    nome: { type: DataTypes.STRING, allowNull: false },
    descricao: { type: DataTypes.STRING, allowNull: true },
    quantidadeMinima: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 10 } },
    ativo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
});

module.exports = Produto;

/*const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Estoque = require('./Estoque');

const Produto = sequelize.define("Produto", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    quantidadeMinima:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 10
        }
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true 
    },
});

Produto.hasMany(Estoque, {
    foreignKey: "produtoId",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
});
Estoque.belongsTo(Produto, {
    foreignKey: "produtoId"
});

module.exports = Produto;*/