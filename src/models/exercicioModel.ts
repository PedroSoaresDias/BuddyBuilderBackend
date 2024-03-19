import { pool } from "./connection";

type Exercicio = {
    nomeExercicio: string;
    idTreino: number;
}

export const getAllExerciciosModel = async () => {
    const exercicio = await pool.query("SELECT * FROM tb_exercicio");
    return exercicio.rows; 
}

export const getExercicioByIdModel = async (id: number) => {
    const exercicioById = await pool.query("SELECT * FROM tb_exercicio WHERE id = $1", [id]);
    return exercicioById.rows[0];
}

export const addExercicioModel = async (exercicio: Exercicio) => {
    const { nomeExercicio, idTreino } = exercicio;
    const query = "INSERT INTO tb_exercicio(nome_exercicio, id_treino) VALUES($1, $2)";
    const values = [nomeExercicio, idTreino]
    const addExercicio = await pool.query(query, values);
    return addExercicio;
}

export const updateExercicioModel = async (id: number, exercicio: Exercicio) => {
    const { nomeExercicio } = exercicio;

    const query = "UPDATE tb_exercicio SET nome_exercicio = $1 WHERE id = $2";
    const values = [nomeExercicio, id];

    const updateExercicio = await pool.query(query, values);
    return updateExercicio;
}

export const deleteExercicioModel = async (id: number) => {
    const query = "DELETE FROM tb_exercicio WHERE id = $1";
    const deleteExercicio = pool.query(query, [id]);
    return deleteExercicio;
}