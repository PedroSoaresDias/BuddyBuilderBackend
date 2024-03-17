import { pool } from "./connection";

type Treino = {
    nomeTreino: string;
}

export const getAllTreinosModel = async () => {
    const query = `
        SELECT
            t.id,
            t.nome_treino,
            e.id AS exercicio_id,
            e.nome_exercicio AS exercicio_nome
        FROM
            tb_treino t
        INNER JOIN
            tb_exercicio e ON t.id = e.id_treino
        ORDER BY
            t.nome_treino ASC
    `;
    const treino = await pool.query(query);
    return treino.rows;
}

export const getTreinoByIdModel = async (id: number) => {
    const query = `
        SELECT
            t.id,
            t.nome_treino,
            e.id AS exercicio_id,
            e.nome_exercicio AS exercicio_nome
        FROM
            tb_treino t
        INNER JOIN
            tb_exercicio e ON t.id = e.id_treino
        WHERE
            t.id = $1
        ORDER BY
            t.nome_treino ASC
    `;
    const treino = await pool.query(query, [id]);
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