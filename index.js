const express = require("express");
const sequelize = require("./database");
require('dotenv').config();
const cors = require('cors');

const autenticarToken = require("./middlewares/autenticarToken");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

sequelize.sync().then(() => {
    console.log("Banco de dados conectado!");
});

app.get("/", (req, res) => {
    res.send("Rota Principal");
});

// Importa a rota de usuários
const usuarioRoutes = require("./routes/usuario.routes");
const estoqueRoutes = require("./routes/estoque.routes")
const produtoRoutes = require("./routes/produto.routes");

app.use("/usuarios", usuarioRoutes);
app.use("/estoques", autenticarToken, estoqueRoutes);
app.use("/produtos", autenticarToken, produtoRoutes);

//app.use("/produtos", require("./routes/produto.routes"));
//app.use("/usuarios", require("./routes/usuario.routes"));
//app.use("/estoques", require("./routes/estoque.routes"));
app.use("/auth", require("./routes/auth.routes"));

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});