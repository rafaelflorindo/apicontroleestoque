const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    if (typeof email !== "string" || email.trim() === "") {
        return res.status(400).json({ error: "E-mail é obrigatório e deve ser uma string." });
    }
    if (typeof senha !== "string" || senha.trim() === "") {
        return res.status(400).json({ error: "Senha é obrigatório e deve ser uma string." });
    }

    const usuario = await Usuario.findOne({ where: { email } })

    if (!usuario)
        return res.status(500).json({ erro: "Usuário não encontrado" })

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
        return res.status(500).json({ message: "Senha invalida" })
    } else {
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, permissao: usuario.permissao },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        return res.status(200).json({
            token,
            message: "Usuário autenticado com sucesso",
            data: {
                nome: usuario.nome,
                email: usuario.email,
                permissao: usuario.permissao,
            }
        });
    }
})

module.exports = router;