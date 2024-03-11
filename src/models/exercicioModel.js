const pool = require("./connection");

const getAllExercicios = async () => {
    const exercicio = await pool.query("SELECT * FROM tb_exercicio");
    return exercicio.rows; 
}

const addExercicio = async (exercicio) => {
    const { nomeExercicio } = exercicio;

    const query = "INSERT INTO tb_exercicio(nome_exercicio) VALUES($1)";
    const addExercicio = await pool.query(query, [nomeExercicio]);
    return addExercicio;
}

const updateExercicio = async (id, exercicio) => {
    const { nomeExercicio } = exercicio;

    const query = "UPDATE tb_exercicio SET nome_exercicio = $1 WHERE id = $2";
    const values = [nomeExercicio, id];

    const updateExercicio = await pool.query(query, values);
    return updateExercicio;
}

module.exports = {
    getAllExercicios,
    addExercicio,
    updateExercicio
}