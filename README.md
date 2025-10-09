🚀 PROJETO: To-Do List Avançado (Back-End Completo)
📌 Visão Geral
Este repositório contém o Back-End (API) de um sistema completo de Lista de Tarefas (To-Do List), desenvolvido seguindo a arquitetura MERN Stack (MongoDB, Express, Node.js). O foco principal deste projeto é a segurança, utilizando Autenticação com JWT e garantindo que cada usuário só possa manipular as suas próprias tarefas.

As Fases 1 a 4 do nosso mapa mental foram concluídas, resultando em uma API totalmente funcional e pronta para ser consumida pelo Front-End (React).

🛠️ Pilha Tecnológica (Tech Stack)
A API foi construída com as seguintes tecnologias e bibliotecas:

Back-End (Node.js/Express)
Categoria	Tecnologia	Uso Principal
Ambiente	Node.js	Motor de execução JavaScript do lado do servidor.
Framework	Express	Criação das rotas e da estrutura da API.
Banco de Dados	MongoDB Atlas	Armazenamento NoSQL dos dados (Usuários e Tarefas).
ODM	Mongoose	Modelagem dos dados e comunicação com o MongoDB (Criação dos Schemas User e Task).
Segurança	bcryptjs	Criptografia das senhas de forma irreversível.
Segurança	jsonwebtoken (JWT)	Geração dos tokens de autenticação para controle de acesso.
Utilitários	dotenv e cors	Gerenciamento de variáveis de ambiente (JWT_SECRET) e permissão de acesso entre Front-End/Back-End.

Exportar para as Planilhas
📁 Estrutura de Pastas
O projeto segue a estrutura de separação de responsabilidades (MVC - Model-View-Controller) dentro da pasta backend:

PROJETO-TO-DO-LIST/
├── backend/
│   ├── controllers/  # Lógica principal das rotas (Registro, Login, CRUD)
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── models/       # Definição da estrutura dos dados (Schemas)
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/       # Definição dos Endpoints e aplicação da segurança
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── middleware/   # Funções de proteção (Ex: Checagem do Token JWT)
│   │   └── authMiddleware.js
│   ├── .env          # Variáveis secretas de conexão e JWT
│   └── server.js     # Arquivo principal que conecta tudo (rotas, DB, middlewares)
└── frontend/         # Área reservada para o Front-End React
⚙️ Instalação e Configuração (Back-End)
Siga os passos para rodar o Back-End localmente:

1. Pré-requisitos
Node.js e npm instalados.

Conta no MongoDB Atlas com o Cluster configurado (Usuário e IPs liberados).

2. Instalação das Dependências
Navegue até a pasta backend e instale as bibliotecas:

Bash

cd backend
npm install
3. Configuração do Arquivo .env
Crie um arquivo chamado .env na pasta backend e preencha com suas credenciais:

Bash

# Link de conexão do MongoDB Atlas (copiado da etapa de Drivers)
MONGO_URI="mongodb+srv://<Lockizao>:<SUA_SENHA_FORTE>@cluster0.xxx.mongodb.net/todo-db?retryWrites=true&w=majority" 

# Porta do Servidor
PORT=5000

# Chave secreta para criptografar os tokens JWT
JWT_SECRET="sua_chave_secreta_aleatoria_e_forte_aqui"
4. Iniciar o Servidor
Execute o servidor no modo de desenvolvimento:

Bash

npm run dev
O servidor estará rodando em http://localhost:5000.

🔑 API Endpoints (Rotas)
A API possui dois conjuntos de rotas: Autenticação (públicas) e Tarefas (protegidas por JWT).

1. Rotas de Autenticação (/api/auth)
Método	Endpoint	Descrição	Status
POST	/api/auth/register	Cria um novo usuário no sistema.	Pública
POST	/api/auth/login	Realiza o login e retorna o Token JWT para acesso futuro.	Pública

Exportar para as Planilhas
2. Rotas de Tarefas (/api/tasks)
Todas as rotas de Tarefas são PROTEGIDAS e requerem o Token JWT no cabeçalho Authorization: Bearer <token>.

Método	Endpoint	Descrição	Segurança
GET	/api/tasks	Lista apenas as tarefas criadas pelo usuário logado.	Privada
POST	/api/tasks	Cria uma nova tarefa e a associa ao user: id do usuário logado.	Privada
PUT	/api/tasks/:id	Atualiza uma tarefa específica. (Verifica se o usuário é o dono).	Privada
DELETE	/api/tasks/:id	Deleta uma tarefa específica. (Verifica se o usuário é o dono).	Privada
