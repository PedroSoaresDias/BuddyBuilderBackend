import { pool } from "./connection";

type User = {
    email: string;
    apelido: string;
    senha: string;
    altura: number;
    peso: number;
    imc: number;
}

export const getAllUsersModel = async (): Promise<any[]> => {
    const query = `
        SELECT
            u.id,
            u.apelido,
            u.email,
            u.created_at,
            u.updated_at,
            u.altura,
            u.peso,
            u.imc,
            json_build_object(
                'id', u.id,
                'apelido', u.apelido,
                'email', u.email,
                'created_at', u.created_at,
                'updated_at', u.updated_at,
                'altura', u.altura,
                'peso', u.peso,
                'imc', u.imc,
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
            u.created_at,
            u.updated_at,
            u.altura,
            u.peso,
            u.imc,
            json_build_object(
                'id', u.id,
                'apelido', u.apelido,
                'email', u.email,
                'created_at', u.created_at,
                'updated_at', u.updated_at,
                'altura', u.altura,
                'peso', u.peso,
                'imc', u.imc,
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
    const { email, apelido, senha, altura, peso, imc } = user;

    const query = `
        INSERT INTO tb_usuario
        (email, apelido, senha, created_at, updated_at, altura, peso, imc)
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $4, $5, $6)
    `;

    const values = [email, apelido, senha, altura, peso, imc];

    const addUser = await pool.query(query, values);
    return addUser.rows[0];
}

export const findUserByEmailModel = async (user: User) => {
    const { email } = user;
    const findUser = await pool.query("SELECT * FROM tb_usuario WHERE email = $1", [email]);
    return findUser.rows[0];
}

export const addUserTreinoModel = async (idUser: number, idTreino: number) => {
    const query = "INSERT INTO tb_usuario_treino(id_usuario, id_treino) VALUES($1, $2)";
    const values = [idUser, idTreino];
    const result = await pool.query(query, values);
    return result;
}

export const updateUserModel = async (id: number, user: User) => {
    const { email, apelido, senha, altura, peso, imc } = user;

    const query = `
        UPDATE tb_usuario SET
        email = $1, apelido = $2, senha = $3, updated_at = CURRENT_TIMESTAMP, altura = $4, peso = $5, imc = $6
        WHERE id = $7
    `;

    const values = [email, apelido, senha, altura, peso, imc, id];

    const updateUser = await pool.query(query, values);
    return updateUser;
}

export const deleteUserModel = async (id: number) => {
    const query = "DELETE FROM tb_usuario WHERE id = $1";
    const removeUser = await pool.query(query, [id]);
    return removeUser;
}