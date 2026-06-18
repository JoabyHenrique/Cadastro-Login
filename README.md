# Cadastro Login - React, Node.js e SQLite

# Tecnologias Utilizadas

## Frontend

* React
* Vite
* JavaScript
* CSS

## Backend

* Node.js
* Express
* SQLite3

# Estrutura do Projeto

CadastroLogin
│
├── Frontend
│
│   ├── src
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   └── package.json
│
└── Backend
    │
    ├── database.db
    ├── package.json
    ├── server.js
    │
    └── src
        │
        ├── database.js
        │
        └── routes
            │
            └── usuarios.js

# Funcionamento do Backend

O backend é responsável por:

* Receber requisições do frontend
* Validar dados enviados pelo usuário
* Consultar o banco de dados
* Cadastrar novos usuários
* Realizar autenticação de login
* Retornar respostas em formato JSON

## Arquivo database.js

Responsável pela conexão com o banco SQLite e criação automática da tabela de usuários.

```javascript
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db');

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            senha TEXT NOT NULL
        )
    `);

});

module.exports = db;
```

### Estrutura da tabela

```sql
CREATE TABLE usuarios(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL
);
```

| Campo | Tipo    | Descrição           |
| ----- | ------- | ------------------- |
| id    | INTEGER | Identificador único |
| nome  | TEXT    | Nome do usuário     |
| email | TEXT    | Email do usuário    |
| senha | TEXT    | Senha do usuário    |

---

## Arquivo server.js

Responsável por iniciar o servidor Express.

### Importações

```javascript
const express = require('express');
const cors = require('cors');
```

### Configurações

```javascript
app.use(cors());
app.use(express.json());
```

### Rotas

```javascript
app.use('/usuarios', usuarios);
```

### Inicialização

```javascript
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
```

Servidor disponível em:

```text
http://localhost:3000
```

---

## Arquivo usuarios.js

Responsável pelas rotas da aplicação.

### Rotas disponíveis

#### Cadastro

```http
POST /usuarios/cadastro
```

#### Login

```http
POST /usuarios/login
```

---

# Funcionamento da Rota de Cadastro

### Dados recebidos

```json
{
    "nome": "Henrique",
    "email": "henrique@gmail.com",
    "senha": "123456",
    "confirmarSenha": "123456"
}
```

### Validações realizadas

* Nome obrigatório
* Email obrigatório
* Senha obrigatória
* Confirmar senha obrigatório
* Senhas devem ser iguais
* Email não pode estar cadastrado

### Consulta SQL

Verifica se o email já existe:

```sql
SELECT * FROM usuarios WHERE email = ?
```

### Inserção no banco

```sql
INSERT INTO usuarios
(nome,email,senha)
VALUES(?,?,?)
```

### Resposta de sucesso

```json
{
    "mensagem": "Usuário cadastrado com sucesso"
}
```

---

# Funcionamento da Rota de Login

### Dados recebidos

```json
{
    "email": "henrique@gmail.com",
    "senha": "123456"
}
```

### Consulta SQL

```sql
SELECT *
FROM usuarios
WHERE email = ?
AND senha = ?
```

### Resposta de sucesso

```json
{
    "mensagem": "Login realizado com sucesso",
    "usuario": {
        "id": 1,
        "nome": "Henrique",
        "email": "henrique@gmail.com"
    }
}
```

---

# Funcionamento do Frontend

O frontend foi desenvolvido utilizando React.

Responsável por:

* Exibir a interface ao usuário
* Capturar dados dos formulários
* Enviar requisições para o backend
* Exibir mensagens de retorno

---

## Arquivo App.jsx

Componente principal da aplicação.

Possui:

* Campo Usuário
* Campo Email
* Campo Senha
* Botão Cadastrar

Estrutura principal:

```jsx
<div className="container">
    <div className="card">
        ...
    </div>
</div>
```

---

## Arquivo App.css

Responsável pela estilização da aplicação.

Principais recursos:

* Flexbox
* Centralização da tela
* Card moderno
* Gradiente de fundo
* Efeito hover nos botões
* Efeito focus nos inputs

Classes utilizadas:

```css
.container
.card
.logo
.input-group
button
```

---

# Fluxo Completo da Aplicação

## Cadastro

1. Usuário abre a aplicação
2. Preenche nome, email e senha
3. Clica em Cadastrar
4. Frontend envia requisição POST
5. Backend recebe os dados
6. Backend valida os campos
7. Backend verifica email existente
8. Usuário é salvo no banco
9. Backend retorna mensagem de sucesso

---

## Login

1. Usuário informa email e senha
2. Frontend envia requisição POST
3. Backend consulta o banco
4. Credenciais são verificadas
5. Login realizado com sucesso

---

# Como Executar o Projeto

## 1 - Clonar o Repositório

```bash
git clone https://github.com/JoabyHenrique/Cadastro-Login.git
```

Entrar na pasta:

```bash
cd Cadastro-Login
```

---

# Executando o Backend

Entrar na pasta Backend:

```bash
cd Backend
```

Instalar dependências:

```bash
npm install
```

Caso necessário:

```bash
npm install express sqlite3 cors
```

Executar o servidor:

```bash
npm run dev
```

ou

```bash
node server.js
```

Resultado esperado:

```text
Servidor rodando na porta 3000
```

---

# Executando o Frontend

Abrir um novo terminal.

Entrar na pasta Frontend:

```bash
cd Frontend
```

Instalar dependências:

```bash
npm install
```

Executar aplicação:

```bash
npm run dev
```

Resultado esperado:

```text
VITE ready

Local:
http://localhost:5173
```

Abrir:

```text
http://localhost:5173
```

---

# Testando a API com Postman

## Cadastro de Usuário

Método:

```http
POST
```

URL:

```http
http://localhost:3000/usuarios/cadastro
```

Body → raw → JSON

```json
{
    "nome":"Henrique",
    "email":"henrique@gmail.com",
    "senha":"123456",
    "confirmarSenha":"123456"
}
```

Resposta esperada:

```json
{
    "mensagem":"Usuário cadastrado com sucesso"
}
```

---

## Login

Método:

```http
POST
```

URL:

```http
http://localhost:3000/usuarios/login
```

Body → raw → JSON

```json
{
    "email":"henrique@gmail.com",
    "senha":"123456"
}
```

Resposta esperada:

```json
{
    "mensagem":"Login realizado com sucesso"
}
```

---

# Testando a API pelo VS Code

Instalar a extensão:

```text
REST Client
```

Criar arquivo:

```text
teste.http
```

### Cadastro

```http
POST http://localhost:3000/usuarios/cadastro
Content-Type: application/json

{
    "nome":"Henrique",
    "email":"henrique@gmail.com",
    "senha":"123456",
    "confirmarSenha":"123456"
}
```

### Login

```http
POST http://localhost:3000/usuarios/login
Content-Type: application/json

{
    "email":"henrique@gmail.com",
    "senha":"123456"
}
```

Executar clicando em:

```text
Send Request
```

---

# Testes Realizados

## Cadastro Válido

```json
{
    "nome":"Henrique",
    "email":"henrique@gmail.com",
    "senha":"123456",
    "confirmarSenha":"123456"
}
```

Resultado:

```text
Usuário cadastrado com sucesso
```

---

## Senhas Diferentes

```json
{
    "senha":"123456",
    "confirmarSenha":"654321"
}
```

Resultado:

```text
As senhas não coincidem
```

---

## Campos Vazios

Resultado:

```text
Todos os campos são obrigatórios
```

---

## Login Correto

```json
{
    "email":"henrique@gmail.com",
    "senha":"123456"
}
```

Resultado:

```text
Login realizado com sucesso
```

---

## Login Inválido

```json
{
    "email":"henrique@gmail.com",
    "senha":"999999"
}
```

Resultado:

```text
Usuário ou senha inválidos
```

---

# Melhorias Implementáveis

## Context API

Permite armazenar informações globais da aplicação.

Exemplo:

```text
AuthContext
│
├── usuario
├── login()
├── logout()
└── cadastro()
```

Benefícios:

* Compartilhamento de estado global
* Menos repasse de props
* Melhor organização do código

---

## Paginação

Pode ser implementada em uma futura listagem de usuários.

Exemplo:

```http
GET /usuarios?page=1&limit=10
```

Consulta SQL:

```sql
SELECT *
FROM usuarios
LIMIT 10
OFFSET 0
```

Página seguinte:

```sql
SELECT *
FROM usuarios
LIMIT 10
OFFSET 10
```

Benefícios:

* Melhor desempenho
* Menor consumo de memória
* Escalabilidade da aplicação

---

# Resumo para a Prova

## Frontend

* React
* JSX
* CSS
* Componentes
* Formulários

## Backend

* Node.js
* Express
* Rotas
* Middleware
* API REST

## Banco de Dados

* SQLite
* CREATE TABLE
* SELECT
* INSERT

## Fluxo da Aplicação

```text
Frontend
    ↓
Requisição HTTP
    ↓
Backend Express
    ↓
SQLite
    ↓
Resposta JSON
    ↓
Frontend
```

## Principais Comandos

Backend:

```bash
cd Backend
npm install
npm run dev
```

Frontend:

```bash
cd Frontend
npm install
npm run dev
```
