const pool = require("./connection");

const getAllTreinos = async () => {
    const treino = await pool.query("SELECT * FROM tb_treino");
    return treino.rows;
}

const addTreino = async (treino) => {
    const { nomeTreino } = treino;
    const query = "INSERT INTO tb_treino(nome_treino) VALUES($1)";
    const addTreino = await pool.query(query, [nomeTreino]);
    return addTreino;
}

module.exports = {
    getAllTreinos,
    addTreino
}