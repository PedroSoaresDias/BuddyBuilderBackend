const validateFieldEmail = (req, res, next) => {
    const { body } = req;

    if (body.email === undefined) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório.' });
    }

    if (body.email === '') {
        return res.status(400).json({ message: 'O email não pode ser vazio.' });
    }

    next();
}

const validateFieldNickname = (req, res, next) => {
    const { body } = req;

    if (body.apelido === undefined) {
        return res.status(400).json({ message: 'O campo "apelido" é obrigatório.' });
    }

    if (body.apelido === '') {
        return res.status(400).json({ message: 'O apelido não pode ser vazio.' });
    }

    next();
}

const validateFieldPassword = (req, res, next) => {
    const { body } = req;

    if (body.senha === undefined) {
        return res.status(400).json({ message: 'O campo "senha" é obrigatório.' });
    }

    if (body.senha === '') {
        return res.status(400).json({ message: 'A senha não pode ser vazia.' });
    }

    next();
}

module.exports = {
    validateFieldEmail,
    validateFieldNickname,
    validateFieldPassword
}