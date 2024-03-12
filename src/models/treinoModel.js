const pool = require("./connection");

const getAllTreinos = async () => {
    const treino = await pool.query("SELECT * FROM tb_treino");
    return treino.rows;
}

module.exports = {
    getAllTreinos
}