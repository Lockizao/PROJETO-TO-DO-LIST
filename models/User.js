const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: [true, 'O nome é obrigatório'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'O e-mail é obrigatório'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        senha: {
            type: String,
            required: [true, 'A senha é obrigatória'],
            minlength: 6,
            select: false, // nunca retorna a senha por padrão nas consultas
        },
    },
    { timestamps: true }
);

// Criptografa a senha antes de salvar, só quando ela foi alterada
userSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) return next();

    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
});

// Compara a senha em texto puro com o hash salvo
userSchema.methods.compararSenha = async function (senhaDigitada) {
    return bcrypt.compare(senhaDigitada, this.senha);
};

module.exports = mongoose.model('User', userSchema);
