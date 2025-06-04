const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");


router.post("/auth/login", async(req, res)=>{
    const {email, senha} = req.body;
    //console.log(email, senha)
    if (typeof email !== "string" || email.trim() === "") {
        return res.status(400).json({ error: "E-mail é obrigatório e deve ser uma string." });
    }
    if (typeof senha !== "string" || senha.trim() === "") {
        return res.status(400).json({ error: "Senha é obrigatório e deve ser uma string." });
    }
    
    const usuario = await Usuario.findOne({where : {email}})
    //console.log(usuario);
    
    if(!usuario)
        return res.status(500).json({erro: "Usuário não encontrado"})
   
    if (senha === usuario.senha){
        return res.status(200).json({
            token: "123",
            message:"Usuário Autenticado com Sucesso",
            data: {
                nome: usuario.nome, 
                email: usuario.email,
                permissao: usuario.permissao
            }, 
        })
    }else{
        return res.status(500).json({message:"Senha invalida"})
    }
})

module.exports = router;