import { pool } from "./connection";

type Treino = {
    nomeTreino: string;
}

export const getAllTreinosModel = async (page: number = 1, limit: number = 5): Promise<any[]> => {
    const offset: number = (page - 1) * limit;

    const query = `
        SELECT
            json_build_object(
                'id', t.id,
                'nome_treino', t.nome_treino,
                'exercicios', (
                    SELECT
                        json_agg(
                            json_build_object(
                                'id', e.id,
                                'nome_exercicio', e.nome_exercicio
                            )
                        )
                    FROM
                        tb_exercicio e
                    WHERE
                        e.id_treino = t.id
                )
            ) AS treino_com_exercicios
        FROM
            tb_treino t
        ORDER BY
            t.id ASC
        LIMIT $1 OFFSET $2
    `;

    const values = [limit, offset];

    const treino = await pool.query(query, values);
    return treino.rows;
}

export const getTreinoByIdModel = async (id: number): Promise<any> => {
    const query = `
        SELECT
            json_build_object(
                'id', t.id,
                'nome_treino', t.nome_treino,
                'exercicios', (
                    SELECT
                        json_agg(
                            json_build_object(
                                'id', e.id,
                                'nome_exercicio', e.nome_exercicio
                            )
                        )
                    FROM
                        tb_exercicio e
                    WHERE
                        e.id_treino = t.id
                )
            ) AS treino_com_exercicios
        FROM
            tb_treino t
        WHERE
            t.id = $1
        ORDER BY
            t.id ASC
    `;
    const treino = await pool.query(query, [id]);
    return treino.rows[0];
}

export const addTreinoModel = async (treino: Treino) => {
    const { nomeTreino } = treino;
    const query = "INSERT INTO tb_treino(nome_treino) VALUES($1)";
    const addTreino = await pool.query(query, [nomeTreino]);
    return addTreino.rows[0];
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