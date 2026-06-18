const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

const usuarios = require('./src/routes/usuarios');

app.use('/usuarios', usuarios);

app.listen(3000, () => {

    console.log('Servidor rodando na porta 3000');

});