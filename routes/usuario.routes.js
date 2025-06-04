const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");

// Criar novo usuário
router.post("/create/", async (req, res) => {
    try {
        const novoUsuario = await Usuario.create(req.body);
        res.status(201).json({ message: "Usuário criado com sucesso!", data: novoUsuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar o usuário." });
    }
});

// Listar todos os usuários
router.get("/listAll", async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar usuários." });
    }
});

// Buscar usuário por ID
router.get("/listOne/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        res.status(200).json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar o usuário." });
    }
});

// Atualizar usuário
router.put("/update/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        await usuario.update(req.body);
        res.status(200).json({ message: "Usuário atualizado com sucesso!", data: usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar o usuário." });
    }
});

// Remover usuário
router.delete("/delete/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        await usuario.destroy();
        res.status(200).json({ message: "Usuário removido com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao remover o usuário." });
    }
});

module.exports = router;
