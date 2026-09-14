const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: [true, 'O título da tarefa é obrigatório'],
            trim: true,
        },
        descricao: {
            type: String,
            trim: true,
            default: '',
        },
        concluida: {
            type: Boolean,
            default: false,
        },
        // Dono da tarefa — todo acesso é filtrado por esse campo
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
