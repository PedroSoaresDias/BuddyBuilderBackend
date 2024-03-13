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

const updateTreino = async (id, treino) => {
    const { nomeTreino } = treino;
    const query = "UPDATE tb_treino SET nome_treino = $1 WHERE id = $2";
    const values = [nomeTreino, id];
    const updateTreino = await pool.query(query, values);
    return updateTreino;
}

module.exports = {
    getAllTreinos,
    getTreinoById,
    addTreino,
    updateTreino
}