/*const Estoque = require("../models/Estoque");
const Produto = require("../models/Produto");*/

const { Produto, Estoque } = require("../models");

async function criarEstoque(req, res) {
    try {
        const novoEstoque = await Estoque.create(req.body);
        res.status(201).json({ message: "Estoque criado com sucesso!", data: novoEstoque });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar o estoque." });
    }
}

async function listarTodosEstoques(req, res) {
    try {
        const estoques = await Estoque.findAll({ include: Produto });
        res.status(200).json(estoques);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar estoques." });
    }
}

async function listarEstoquePorId(req, res) {
    try {
        const id = Number(req.params.id);
        const estoque = await Estoque.findByPk(id, { include: Produto });

        if (!estoque) {
            return res.status(404).json({ message: "Estoque não encontrado." });
        }

        res.status(200).json(estoque);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar o estoque." });
    }
}

async function atualizarEstoque(req, res) {
    try {
        const id = Number(req.params.id);
        const estoque = await Estoque.findByPk(id);

        if (!estoque) {
            return res.status(404).json({ error: "Estoque não encontrado." });
        }

        await estoque.update(req.body);
        res.status(200).json({ message: "Estoque atualizado com sucesso!", data: estoque });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar o estoque." });
    }
}

async function ativarEstoque(req, res) {
    try {
        const id = Number(req.params.id);
        const estoque = await Estoque.findByPk(id);

        if (!estoque) {
            return res.status(404).json({ error: "Estoque não encontrado." });
        }

        estoque.ativo = true;
        await estoque.save();

        res.status(200).json({ message: "Estoque ativado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao ativar estoque." });
    }
}

async function inativarEstoque(req, res) {
    try {
        const id = Number(req.params.id);
        const estoque = await Estoque.findByPk(id);

        if (!estoque) {
            return res.status(404).json({ error: "Estoque não encontrado." });
        }

        estoque.ativo = false;
        await estoque.save();

        res.status(200).json({ message: "Estoque inativado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao inativar estoque." });
    }
}

module.exports = {
    criarEstoque,
    listarTodosEstoques,
    listarEstoquePorId,
    atualizarEstoque,
    ativarEstoque,
    inativarEstoque
};