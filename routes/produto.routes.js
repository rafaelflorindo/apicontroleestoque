const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');

router.get('/listAll', async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        if (produtos.length === 0) return res.status(200).json({ message: "Nenhum produto encontrado.", data: [] });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar produtos." });
    }
});

router.get('/listOne/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido." });
    
    try {
        const produto = await Produto.findByPk(id);
        if (!produto) return res.status(404).json({ message: "Produto não encontrado." });
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar o produto." });
    }
});

router.post('/create/', async (req, res) => {
    const { nome, descricao, quantidadeMinima } = req.body;
    if (!nome || !descricao || !Number.isInteger(quantidadeMinima)) {
        return res.status(400).json({ error: "Dados inválidos." });
    }
    try {
        const novoProduto = await Produto.create(req.body);
        res.status(201).json(novoProduto);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar produto." });
    }
});

router.put('/update/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { nome, descricao, quantidadeMinima } = req.body;

    if (isNaN(id)) return res.status(400).json({ error: "ID inválido." });
    if (!nome || !descricao || !Number.isInteger(quantidadeMinima)) {
        return res.status(400).json({ error: "Dados inválidos." });
    }

    try {
        const produto = await Produto.findByPk(id);
        if (!produto) return res.status(404).json({ error: "Produto não encontrado." });
        await produto.update(req.body);
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar produto." });
    }
});

router.delete('/delete/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido." });

    try {
        const produto = await Produto.findByPk(id);
        if (!produto) return res.status(404).json({ error: "Produto não encontrado." });
        await produto.destroy();
        res.status(200).json({ message: "Produto removido com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao remover produto." });
    }
});

module.exports = router;
