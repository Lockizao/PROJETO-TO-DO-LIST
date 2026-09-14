# 🚀 To-Do List Avançado (Back-End Completo)

## 📌 Visão Geral
Este repositório contém o **Back-End (API)** de um sistema completo de **Lista de Tarefas (To-Do List)**, desenvolvido com a arquitetura **MERN Stack** (MongoDB, Express, Node.js).  

✨ **Destaques do projeto**:  
- Autenticação segura com **JWT**  
- Cada usuário só manipula suas próprias tarefas  
- API pronta para consumo pelo Front-End React  
- Estrutura modular seguindo **MVC**  

---

## 🛠️ Pilha Tecnológica (Tech Stack)

| Categoria | Tecnologia | Uso Principal |
|-----------|-----------|---------------|
| 🌐 Ambiente | Node.js | Motor de execução JavaScript no servidor |
| ⚡ Framework | Express | Criação das rotas e estrutura da API |
| 🗄️ Banco de Dados | MongoDB Atlas | Armazenamento NoSQL (Usuários e Tarefas) |
| 📦 ODM | Mongoose | Modelagem de dados e comunicação com MongoDB |
| 🔒 Segurança | bcryptjs | Criptografia de senhas |
| 🔑 Segurança | jsonwebtoken (JWT) | Geração de tokens de autenticação |
| 🛠️ Utilitários | dotenv, cors | Variáveis de ambiente e permissões CORS |

---

## 📁 Estrutura de Pastas

```
PROJETO-TO-DO-LIST/
├── controllers/        # Lógica das rotas (Registro, Login, CRUD)
│   ├── authController.js
│   └── taskController.js
├── models/              # Estrutura dos dados (Schemas)
│   ├── User.js
│   └── Task.js
├── routes/               # Endpoints e aplicação da segurança
│   ├── authRoutes.js
│   └── taskRoutes.js
├── middleware/           # Funções de proteção (JWT)
│   └── authMiddleware.js
├── .env.example          # Modelo das variáveis de ambiente (copie para .env)
└── server.js             # Arquivo principal (rotas, DB, middlewares)
```

O front-end (React) fica em outro repositório/pasta, consumindo essa API via REST.

---

## ⚙️ Instalação e Configuração (Back-End)

### Pré-requisitos
- Node.js e npm instalados
- Conta no MongoDB Atlas com cluster configurado

### Instalação
```bash
npm install
```

### Configuração do .env
Copie `.env.example` para `.env` e preencha com seus valores:
```env
MONGO_URI="mongodb+srv://<USUARIO>:<SENHA>@cluster0.xxx.mongodb.net/todo-db?retryWrites=true&w=majority"
PORT=5000
JWT_SECRET="sua_chave_secreta_aleatoria_e_forte_aqui"
```

### Iniciar o Servidor
```bash
npm run dev
```
🌐 O servidor estará rodando em: http://localhost:5000

🔑 API Endpoints
1️⃣ Rotas de Autenticação (/api/auth)
Método	Endpoint	Descrição	Status
POST	/api/auth/register	Cria novo usuário	Pública
POST	/api/auth/login	Realiza login e retorna Token JWT	Pública

2️⃣ Rotas de Tarefas (/api/tasks)
⚠️ Todas as rotas requerem o Token JWT no header:
Authorization: Bearer <TOKEN>

Método	Endpoint	Descrição	Segurança
GET	/api/tasks	Lista tarefas do usuário logado	Privada
POST	/api/tasks	Cria nova tarefa associada ao usuário logado	Privada
PUT	/api/tasks/:id	Atualiza tarefa específica (verifica dono)	Privada
DELETE	/api/tasks/:id	Deleta tarefa específica (verifica dono)	Privada

✅ Funcionalidades
📝 Criar, editar e deletar tarefas

✔️ Marcar tarefas como concluídas

🔒 Login e registro de usuários

🛡️ Autenticação e controle de acesso via JWT

🎯 Conclusão
Esta API fornece todas as funcionalidades de um To-Do List completo, pronta para integração com Front-End em React ou qualquer cliente RESTful.
