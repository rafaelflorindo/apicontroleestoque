// models/index.js
const Produto = require("./Produto");
const Estoque = require("./Estoque");

// Definir associações aqui
Produto.hasMany(Estoque, { foreignKey: "produtoId", onDelete: "RESTRICT", onUpdate: "CASCADE" });
Estoque.belongsTo(Produto, { foreignKey: "produtoId" });

module.exports = {
  Produto,
  Estoque,
};
