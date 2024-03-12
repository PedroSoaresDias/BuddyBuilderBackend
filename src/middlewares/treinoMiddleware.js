const validateFieldTreino = (req, res, next) => {
    const { body } = req;

    if (body.nomeTreino === undefined) {
        return res.status(400).json({ message: 'O campo "nome treino" é obrigatório.' });
    }

    if (body.nomeTreino === "") {
        return res.status(400).json({ message: 'O "nome treino" não pode ser vazio.' });
    }

    next();
}

module.exports = {
    validateFieldTreino
}