const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Usuario = sequelize.define("Usuario", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail:true
        }
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    telefone:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    permissao:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = Usuario;