const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protege rotas: exige "Authorization: Bearer <TOKEN>" válido e injeta req.user
const protect = async (req, res, next) => {
    let token;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ mensagem: 'Não autorizado, token não informado.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Carrega o usuário (sem a senha) e disponibiliza pro resto da requisição
        req.user = await User.findById(decoded.id).select('-senha');

        if (!req.user) {
            return res.status(401).json({ mensagem: 'Usuário do token não existe mais.' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ mensagem: 'Não autorizado, token inválido ou expirado.' });
    }
};

module.exports = { protect };
