// Importa a biblioteca Express
const express = require('express');

// Cria um gerenciador de rotas
const router = express.Router();

// Importa a conexão com o banco de dados
const db = require('../database');


// CADASTRO 

// Cria a rota POST /cadastro
router.post('/cadastro', (req, res) => {

    // Recebe os dados enviados pelo frontend
    const {
        nome,
        email,
        senha,
        confirmarSenha
    } = req.body;


    // Verifica se todos os campos foram preenchidos
    if (
        !nome ||
        !email ||
        !senha ||
        !confirmarSenha
    ) {

        return res.status(400).json({

            mensagem: 'Todos os campos são obrigatórios'

        });
    }


    // Verifica se as senhas são iguais
    if (senha !== confirmarSenha) {

        return res.status(400).json({

            mensagem: 'As senhas não coincidem'

        });
    }


    // Consulta se o email já existe no banco
    db.get(

        'SELECT * FROM usuarios WHERE email = ?',

        [email],

        (err, usuario) => {

            // Verifica erro na consulta
            if (err) {

                return res.status(500).json({

                    mensagem: 'Erro no banco de dados'

                });

            }


            // Verifica se já existe um usuário
            if (usuario) {

                return res.status(400).json({

                    mensagem: 'Email já cadastrado'

                });

            }


            // Insere um novo usuário no banco
            db.run(

                `
                INSERT INTO usuarios
                (nome,email,senha)
                VALUES(?,?,?)
                `,

                [nome, email, senha],

                function (err) {

                    // Verifica erro ao cadastrar
                    if (err) {

                        return res.status(500).json({

                            mensagem: err.message

                        });

                    }


                    // Retorna sucesso
                    res.status(201).json({

                        mensagem: 'Usuário cadastrado com sucesso'

                    });

                }

            );

        }

    );

});


// LOGIN 

// Cria a rota POST /login
router.post('/login', (req, res) => {

    // Recebe email e senha
    const {

        email,

        senha

    } = req.body;


    // Verifica se os campos foram preenchidos
    if (!email || !senha) {

        return res.status(400).json({

            mensagem: 'Email e senha são obrigatórios'

        });

    }


    // Consulta usuário no banco
    db.get(

        `
        SELECT *
        FROM usuarios
        WHERE email = ?
        AND senha = ?
        `,

        [email, senha],

        (err, usuario) => {

            // Verifica erro de consulta
            if (err) {

                return res.status(500).json({

                    mensagem: 'Erro no banco de dados'

                });

            }


            // Verifica se encontrou usuário
            if (!usuario) {

                return res.status(401).json({

                    mensagem: 'Usuário ou senha inválidos'

                });

            }


            // Login realizado com sucesso
            res.status(200).json({

                mensagem: 'Login realizado com sucesso',

                usuario: {

                    id: usuario.id,

                    nome: usuario.nome,

                    email: usuario.email

                }

            });

        }

    );

});


// Exporta as rotas para serem usadas no servidor
module.exports = router;