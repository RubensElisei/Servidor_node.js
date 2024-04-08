require('dotenv').config();

const http = require("http");
const express = require("express"); 

const app = express();
const hostname = "127.0.0.1" 
const port = 3000;

const mysql = require('mysql2');
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send("Bem-vindos ao meu servidor!");
});

app.get('/clientes', (req, res) => {
    const sql = 'SELECT * FROM clientes';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao executar consulta:', err);
            res.status(500).send('Erro interno do servidor');
            return;
        }
        res.json(results);
    });
});

// Endpoint POST para criar um novo cliente
app.post('/clientes', (req, res) => {
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
});

// Endpoint PUT para atualizar um cliente existente
app.put('/clientes/:id', (req, res) => {
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
});

// Endpoint DELETE para excluir um cliente
app.delete('/clientes/:id', (req, res) => {
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
});

// Endpoint GET para obter todos os produtos
app.get('/produtos', (req, res) => {
    const sql = 'SELECT * FROM produtos';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao executar consulta:', err);
            res.status(500).send('Erro interno do servidor');
            return;
        }
        res.json(results);
    });
});

// Endpoint POST para criar um novo produto
app.post('/produtos', (req, res) => {
    const { nome, descricao, preco, data_atualizado } = req.body;
    const sql = 'INSERT INTO produtos (nome, descricao, preco, data_atualizado) VALUES (?, ?, ?, ?)';
    const values = [nome, descricao, preco, data_atualizado];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erro ao inserir produto:', err);
            res.status(500).send('Erro interno do servidor');
            return;
        }
        res.json({ id: result.insertId });
    });
});

// Endpoint PUT para atualizar um produto existente
app.put('/produtos/:id', (req, res) => {
    const produtoId = req.params.id;
    const { nome, descricao, preco, data_atualizado } = req.body;

    const sql = 'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, data_atualizado = ? WHERE id = ?';
    const values = [nome, descricao, preco, data_atualizado, produtoId];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erro ao atualizar produto:', err);
            res.status(500).send('Erro interno do servidor');
            return;
        }
        res.json({ message: 'Produto atualizado com sucesso' });
    });
});

// Endpoint DELETE para excluir um produto
app.delete('/produtos/:id', (req, res) => {
    const produtoId = req.params.id;
    const sql = 'DELETE FROM produtos WHERE id = ?';
    const values = [produtoId];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erro ao excluir produto:', err);
            res.status(500).send('Erro interno do servidor');
            return;
        }
        res.json({ message: 'Produto excluído com sucesso' });
    });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});
