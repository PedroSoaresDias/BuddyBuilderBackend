const validateFieldExercicio = (req, res, next) => {
    const { body } = req;

    if (body.nomeExercicio === undefined) {
        res.status(400).json({ message: "Campo nome exercicio é obrigatório" });
    }

    if (body.nomeExercicio === "") {
        res.status(400).json({ message: "O campo nome exercicio não pode ser vazio" });
    }

    next();
}

module.exports = {
    validateFieldExercicio
}