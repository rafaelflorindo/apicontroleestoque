const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");

// Criar usuário
async function criarUsuario(req, res) {
    const { email } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (usuario) {
            return res.status(409).json({ erro: "Usuário já cadastrado" });
        }

        const salto = 10;
        req.body.senha = await bcrypt.hash(req.body.senha, salto);
        const novoUsuario = await Usuario.create(req.body);
        const { senha, ...usuarioSeguro } = novoUsuario.toJSON();

        res.status(201).json({
            message: "Usuário criado com sucesso!",
            data: usuarioSeguro
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar o usuário." });
    }
}

// Listar todos os usuários
async function listarUsuarios(req, res) {
    try {
        const usuarios = await Usuario.findAll();
        const usuariosSemSenha = usuarios.map(u => {
            const { senha, ...dados } = u.toJSON();
            return dados;
        });
        res.status(200).json({
            message: "Lista de usuários recuperada com sucesso!",
            data: usuariosSemSenha
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar usuários." });
    }
}

// Listar usuário por ID
async function listarUsuarioPorId(req, res) {
    try {
        const id = Number(req.params.id);
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        const { senha, ...usuarioSeguro } = usuario.toJSON();
        res.status(200).json({
            message: "Usuário recuperado com sucesso!",
            data: usuarioSeguro
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar o usuário." });
    }
}

// Atualizar usuário
async function atualizarUsuario(req, res) {
    try {
        const id = Number(req.params.id);
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        if (req.body.senha) {
            const salto = 10;
            req.body.senha = await bcrypt.hash(req.body.senha, salto);
        }

        await usuario.update(req.body);
        const { senha, ...usuarioSeguro } = usuario.toJSON();

        res.status(200).json({
            message: "Usuário atualizado com sucesso!",
            data: usuarioSeguro
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar o usuário." });
    }
}

// Ativar usuário
async function ativarUsuario(req, res) {
    try {
        const id = Number(req.params.id);
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        usuario.ativo = true;
        await usuario.save();
        res.status(200).json({ message: "Usuário ativado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao ativar o usuário." });
    }
}

// Inativar usuário
async function inativarUsuario(req, res) {
    try {
        const id = Number(req.params.id);
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        usuario.ativo = false;
        await usuario.save();
        res.status(200).json({ message: "Usuário inativado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao inativar o usuário." });
    }
}

module.exports = {
    criarUsuario,
    listarUsuarios,
    listarUsuarioPorId,
    atualizarUsuario,
    ativarUsuario,
    inativarUsuario
};
