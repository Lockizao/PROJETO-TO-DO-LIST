const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Gera um token JWT válido por 30 dias contendo o id do usuário
const gerarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// POST /api/auth/register
const registrar = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ mensagem: 'Nome, e-mail e senha são obrigatórios.' });
        }

        const usuarioExiste = await User.findOne({ email });
        if (usuarioExiste) {
            return res.status(400).json({ mensagem: 'Já existe um usuário com esse e-mail.' });
        }

        const usuario = await User.create({ nome, email, senha });

        return res.status(201).json({
            _id: usuario._id,
            nome: usuario.nome,
            email: usuario.email,
            token: gerarToken(usuario._id),
        });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao registrar usuário.', erro: error.message });
    }
};

// POST /api/auth/login
const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ mensagem: 'E-mail e senha são obrigatórios.' });
        }

        // .select('+senha') porque o schema esconde a senha por padrão
        const usuario = await User.findOne({ email }).select('+senha');

        if (!usuario || !(await usuario.compararSenha(senha))) {
            return res.status(401).json({ mensagem: 'E-mail ou senha inválidos.' });
        }

        return res.status(200).json({
            _id: usuario._id,
            nome: usuario.nome,
            email: usuario.email,
            token: gerarToken(usuario._id),
        });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao realizar login.', erro: error.message });
    }
};

module.exports = { registrar, login };
