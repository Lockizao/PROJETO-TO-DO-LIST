const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); 

// 1. Importa as Rotas
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

// -----------------------------------------------------
// CONFIGURAÇÃO
// -----------------------------------------------------
// Carrega as variáveis de ambiente (.env)
dotenv.config();

// Inicializa o Express
const app = express();

// Define a porta, pegando do .env ou usando 5000 como fallback
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// -----------------------------------------------------
// FUNÇÃO DE CONEXÃO COM O MONGODB
// -----------------------------------------------------
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB conectado com sucesso!');
    } catch (error) {
        console.error(`Erro ao conectar ao MongoDB: ${error.message}`);
        process.exit(1); // Sai do processo em caso de falha
    }
};

// Chama a função para conectar ao DB
connectDB();

// -----------------------------------------------------
// MIDDLEWARES GLOBAIS
// -----------------------------------------------------
// Permite que o servidor leia dados JSON do corpo das requisições
app.use(express.json()); 
// Permite que o Front-end (em outra porta) acesse a API
app.use(cors()); 

// -----------------------------------------------------
// CONEXÃO DAS ROTAS DA API
// -----------------------------------------------------

// Rota base (Teste simples)
app.get('/', (req, res) => {
    res.send('API To-Do List rodando...');
});

// Rotas de Autenticação (Registro e Login)
app.use('/api/auth', authRoutes); 

// Rotas de Tarefas (CRUD)
app.use('/api/tasks', taskRoutes);

// -----------------------------------------------------
// INICIALIZAÇÃO DO SERVIDOR
// -----------------------------------------------------
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));