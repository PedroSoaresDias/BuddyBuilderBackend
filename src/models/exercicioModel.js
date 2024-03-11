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

module.exports = {
    getAllExercicios,
    addExercicio
}