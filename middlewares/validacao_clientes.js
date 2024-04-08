// Middleware para validar os campos de um novo cliente
exports.validarNovoCliente = (req, res, next) => {
    const { nome, sobrenome, email, idade } = req.body;

    if (!nome || !sobrenome || !email || !idade) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    next();
};

// Middleware para validar os campos de atualização de um cliente
exports.validarAtualizacaoCliente = (req, res, next) => {
    const { nome, sobrenome, email, idade } = req.body;

    if (!nome && !sobrenome && !email && !idade) {
        return res.status(400).json({ message: 'Pelo menos um campo deve ser fornecido para atualização' });
    }

    next();
};
