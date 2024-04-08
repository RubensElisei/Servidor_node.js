// controllers/clientesController.js

const mysql = require('mysql2');
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Função para criar um novo cliente
exports.criarCliente = (req, res) => {
    const { nome, sobrenome, email, idade } = req.body;

    const sql = 'INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)';
    const values = [nome, sobrenome, email, idade];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erro ao inserir cliente:', err);
            res.status(500).send('Erro interno do servidor');
            return;
        }
        res.json({ id: result.insertId });
    });
};

// Função para atualizar um cliente existente
exports.atualizarCliente = (req, res) => {
    const clienteId = req.params.id;
    const { nome, sobrenome, email, idade } = req.body;

    const sql = 'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?';
    const values = [nome, sobrenome, email, idade, clienteId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erro ao atualizar cliente:', err);
            res.status(500).send('Erro interno do servidor');
            return;
        }
        res.json({ message: 'Cliente atualizado com sucesso' });
    });
};

// Função para excluir um cliente
exports.excluirCliente = (req, res) => {
    const clienteId = req.params.id;

    const sql = 'DELETE FROM clientes WHERE id = ?';
    const values = [clienteId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erro ao excluir cliente:', err);
            res.status(500).send('Erro interno do servidor');
            return;
        }
        res.json({ message: 'Cliente excluído com sucesso' });
    });
};

// Função para obter todos os clientes
exports.obterClientes = (req, res) => {
    const sql = 'SELECT * FROM clientes';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao executar consulta:', err);
            res.status(500).send('Erro interno do servidor');
            return;
        }
        res.json(results);
    });
};
