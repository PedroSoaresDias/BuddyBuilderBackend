import { pool } from "./connection";

type Treino = {
    nomeTreino: string;
}

export const getAllTreinosModel = async () => {
    const treino = await pool.query("SELECT * FROM tb_treino");
    return treino.rows;
}

export const getTreinoByIdModel = async (id: number) => {
    const treino = await pool.query("SELECT * FROM tb_treino WHERE id = $1", [id]);
    return treino.rows[0];
}

export const addTreinoModel = async (treino: Treino) => {
    const { nomeTreino } = treino;
    const query = "INSERT INTO tb_treino(nome_treino) VALUES($1)";
    const addTreino = await pool.query(query, [nomeTreino]);
    return addTreino;
}

export const updateTreinoModel = async (id: number, treino: Treino) => {
    const { nomeTreino } = treino;
    const query = "UPDATE tb_treino SET nome_treino = $1 WHERE id = $2";
    const values = [nomeTreino, id];
    const updateTreino = await pool.query(query, values);
    return updateTreino;
}

export const deleteTreinoModel = async (id: number) => {
    const query = "DELETE FROM tb_treino WHERE id = $1";
    const deleteTreino = await pool.query(query, [id]);
    return deleteTreino;
}