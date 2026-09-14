const Task = require('../models/Task');

// GET /api/tasks — lista só as tarefas do usuário logado
const listarTarefas = async (req, res) => {
    try {
        const tarefas = await Task.find({ usuario: req.user._id }).sort({ createdAt: -1 });
        return res.status(200).json(tarefas);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao listar tarefas.', erro: error.message });
    }
};

// POST /api/tasks — cria tarefa associada ao usuário logado
const criarTarefa = async (req, res) => {
    try {
        const { titulo, descricao } = req.body;

        if (!titulo) {
            return res.status(400).json({ mensagem: 'O título da tarefa é obrigatório.' });
        }

        const tarefa = await Task.create({
            titulo,
            descricao,
            usuario: req.user._id,
        });

        return res.status(201).json(tarefa);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao criar tarefa.', erro: error.message });
    }
};

// Busca a tarefa e confere se ela pertence ao usuário logado
const buscarTarefaDoUsuario = async (id, usuarioId) => {
    const tarefa = await Task.findById(id);
    if (!tarefa) return { erro: 404, mensagem: 'Tarefa não encontrada.' };
    if (tarefa.usuario.toString() !== usuarioId.toString()) {
        return { erro: 403, mensagem: 'Você não tem permissão para acessar essa tarefa.' };
    }
    return { tarefa };
};

// PUT /api/tasks/:id — atualiza tarefa específica (verifica dono)
const atualizarTarefa = async (req, res) => {
    try {
        const { tarefa, erro, mensagem } = await buscarTarefaDoUsuario(req.params.id, req.user._id);
        if (erro) return res.status(erro).json({ mensagem });

        const { titulo, descricao, concluida } = req.body;
        if (titulo !== undefined) tarefa.titulo = titulo;
        if (descricao !== undefined) tarefa.descricao = descricao;
        if (concluida !== undefined) tarefa.concluida = concluida;

        await tarefa.save();
        return res.status(200).json(tarefa);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao atualizar tarefa.', erro: error.message });
    }
};

// DELETE /api/tasks/:id — deleta tarefa específica (verifica dono)
const deletarTarefa = async (req, res) => {
    try {
        const { tarefa, erro, mensagem } = await buscarTarefaDoUsuario(req.params.id, req.user._id);
        if (erro) return res.status(erro).json({ mensagem });

        await tarefa.deleteOne();
        return res.status(200).json({ mensagem: 'Tarefa removida com sucesso.' });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao deletar tarefa.', erro: error.message });
    }
};

module.exports = { listarTarefas, criarTarefa, atualizarTarefa, deletarTarefa };
