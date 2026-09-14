const express = require('express');
const {
    listarTarefas,
    criarTarefa,
    atualizarTarefa,
    deletarTarefa,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Todas as rotas de tarefas exigem token JWT válido
router.use(protect);

router.route('/').get(listarTarefas).post(criarTarefa);
router.route('/:id').put(atualizarTarefa).delete(deletarTarefa);

module.exports = router;
