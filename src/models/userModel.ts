import { pool } from "./connection";

type User = {
    email: string;
    apelido: string;
    senha: string;
}

export const getAllUsersModel = async (): Promise<any[]> => {
    const query = `
        SELECT
            u.id,
            u.apelido,
            u.email,
            json_build_object(
                'id', u.id,
                'apelido', u.apelido,
                'email', u.email,
                'treinos', (
                    SELECT
                        json_agg(
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
                            )
                        )
                    FROM
                        tb_treino t
                    INNER JOIN
                        tb_usuario_treino ut ON t.id = ut.id_treino
                    WHERE
                        ut.id_usuario = u.id
                )
            ) AS usuario_com_treinos
        FROM
            tb_usuario u
        ORDER BY
            u.apelido ASC
    `;
    const user = await pool.query(query);
    return user.rows;
}

export const getUserByIdModel = async (id: number): Promise<any> => {
    const query = `
        SELECT
            u.id,
            u.apelido,
            u.email,
            json_build_object(
                'id', u.id,
                'apelido', u.apelido,
                'email', u.email,
                'treinos', (
                    SELECT
                        json_agg(
                            json_build_object(
                                'id', t.id,
                                'nome_treino', t.nome_treino,
                                'exercicios', (
                                    SELECT
                                        json_agg(
                                            json_build_object(
                                                'id', e.id,
                                                'nome_exercicio', e.    nome_exercicio
                                            )
                                        )
                                    FROM
                                        tb_exercicio e
                                    WHERE
                                        e.id_treino = t.id
                                )
                            )
                        )
                    FROM
                        tb_treino t
                    INNER JOIN
                        tb_usuario_treino ut ON t.id = ut.id_treino
                    WHERE
                        ut.id_usuario = u.id
                )
            ) AS usuario_com_treinos
        FROM
            tb_usuario u
        WHERE
            u.id = $1
        ORDER BY
            u.apelido ASC
    `;
    const user = await pool.query(query, [id]);
    return user.rows[0];
}

export const addUserModel = async (user: User) => {
    const { email, apelido, senha } = user;

    const query = "INSERT INTO tb_usuario(email, apelido, senha) VALUES($1, $2, $3)";
    const values = [email, apelido, senha];

    const addUser = await pool.query(query, values);
    return addUser;
}

export const updateUserModel = async (id: number, user: User) => {
    const { email, apelido, senha } = user;

    const query = "UPDATE tb_usuario SET email = $1, apelido = $2, senha = $3 WHERE id = $4";
    const values = [email, apelido, senha, id];

    const updateUser = await pool.query(query, values);
    return updateUser;
}

export const deleteUserModel = async (id: number) => {
    const query = "DELETE FROM tb_usuario WHERE id = $1";
    const removeUser = await pool.query(query, [id]);
    return removeUser;
}