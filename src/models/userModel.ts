import { pool } from "./connection";

type User = {
    email: string;
    apelido: string;
    senha: string;
}

export const getAllUsersModel = async () => {
    const user = await pool.query("SELECT * FROM tb_usuario");
    return user.rows;
}

export const getUserByIdModel = async (id: number) => {
    const user = await pool.query("SELECT * FROM tb_usuario WHERE id = $1", [id]);
    return user.rows[0];
}

export const addUserModel = async (user: User) => {
    const { email, apelido, senha } = user;

    const query = "INSERT INTO tb_usuario(email, apelido, senha) VALUES($1, $2, $3)";
    const values = [email, apelido, senha];

    const addUser = await pool.query(query, values);
    return addUser;
}

export  const updateUserModel = async (id: number, user: User) => {
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