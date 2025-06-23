const express = require("express");
const router = express.Router();

const {
    listarTodosProdutos,
    listarProdutoPorId,
    criarProduto,
    atualizarProduto,
    inativarProduto,
    ativarProduto
} = require("../controllers/produtoController");

router.get("/listAll", listarTodosProdutos);
router.get("/listOne/:id", listarProdutoPorId);
router.post("/create", criarProduto);
router.put("/update/:id", atualizarProduto);
router.put("/inativar/:id", inativarProduto);
router.put("/ativar/:id", ativarProduto);

module.exports = router;
