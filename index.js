const express = require("express");
const sequelize = require("./database");
require('dotenv').config();
const cors = require('cors');

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

app.use("/produtos", require("./routes/produto.routes"));
app.use("/usuarios", require("./routes/usuario.routes"));
app.use("/estoques", require("./routes/estoque.routes"));
app.use("/auth", require("./routes/auth.routes"));

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
