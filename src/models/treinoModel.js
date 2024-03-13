const pool = require("./connection");

const getAllTreinos = async () => {
    const treino = await pool.query("SELECT * FROM tb_treino");
    return treino.rows;
}

const getTreinoById = async (id) => {
    const treino = await pool.query("SELECT * FROM tb_treino WHERE id = $1", [id]);
    return treino.rows[0];
}

const addTreino = async (treino) => {
    const { nomeTreino } = treino;
    const query = "INSERT INTO tb_treino(nome_treino) VALUES($1)";
    const addTreino = await pool.query(query, [nomeTreino]);
    return addTreino;
}

module.exports = {
    getAllTreinos,
    getTreinoById,
    addTreino
}