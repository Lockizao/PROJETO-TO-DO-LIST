const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
// TOP DO ARQUIVO: IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); 

const authRoutes = require('./routes/authRoutes'); // <--- NOVO: Importa as Rotas de Auth

// ... (Resto do código de configuração e connectDB)

// MIDDLEWARES E ROTAS
app.use(express.json()); 
app.use(cors()); 

// -----------------------------------------------------
// 2. Conexão das Rotas
// -----------------------------------------------------
app.use('/api/auth', authRoutes); // <--- NOVO: Define o ponto de partida das rotas de Auth

// ... (Resto do código)
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);