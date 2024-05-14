import { pool } from "./connection";
import bcrypt from "bcrypt";
import { userBaseQuery } from "./queries";

export type User = {
    id: number;
    email: string;
    apelido: string;
    senha: string;
    altura: number;
    peso: number;
    imc: number;
    usuario_com_treinos: {
        id: number;
        nome_treino: string
    }
}

export const getAllUsersModel = async (page: number = 1, limit: number = 5): Promise<User[]> => {
    const offset: number = (page - 1) * limit;
    const query = `
        ${userBaseQuery}
        ORDER BY u.id ASC
        LIMIT $1 OFFSET $2
    `;
    const values = [limit, offset];
    const user = await pool.query(query, values);
    return user.rows;
}

export const getUserByIdModel = async (id: number): Promise<User> => {
    const query = `
        ${userBaseQuery}
        WHERE u.id = $1
    `;
    const user = await pool.query(query, [id]);
    return user.rows[0] as User;
}

export const addUserModel = async (user: User) => {
    const { email, apelido, senha, altura, peso, imc } = user;
    const senhaHashed = await bcrypt.hash(senha, 10);
    const query = `
        INSERT INTO tb_usuario
        (email, apelido, senha, created_at, updated_at, altura, peso, imc)
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $4, $5, $6)
    `;
    const values = [email, apelido, senhaHashed, altura, peso, imc];
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
    return result.rows[0];
}

export const updateUserModel = async (id: number, user: User) => {
    const { email, apelido, senha, altura, peso, imc } = user;
    const senhaHashed = await bcrypt.hash(senha, 10);
    const query = `
        UPDATE tb_usuario SET
        email = $1, apelido = $2, senha = $3, updated_at = CURRENT_TIMESTAMP, altura = $4, peso = $5, imc = $6
        WHERE id = $7
    `;
    const values = [email, apelido, senhaHashed, altura, peso, imc, id];
    const updateUser = await pool.query(query, values);
    return updateUser.rows[0];
}

export const deleteUserModel = async (id: number) => {
    const query = "DELETE FROM tb_usuario WHERE id = $1";
    const removeUser = await pool.query(query, [id]);
    return removeUser.rows[0];
}

export const deleteUserTreinoModel = async (idUser: number, idTreino: number) => {
    const query = "DELETE FROM tb_usuario_treino WHERE id_usuario = $1 AND id_treino = $2";
    const values = [idUser, idTreino];
    const result = await pool.query(query, values);

    if (result.rowCount === 0) throw new Error("Treino não encontrado para o usuário especificado");

    return result.rows[0];
}