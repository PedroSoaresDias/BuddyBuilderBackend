const pool = require("./connection")

const getAllUsers = async () => {
    const user = await pool.query("SELECT * FROM tb_usuario");
    return user.rows;
}

const getUserById = async (id) => {
    const user = await pool.query("SELECT * FROM tb_usuario WHERE id = $1", [id]);
    return user.rows;
}

const addUser = async (user) => {
    const { email, apelido, senha } = user;

    const query = "INSERT INTO tb_usuario(email, apelido, senha) VALUES($1, $2, $3)";
    const values = [email, apelido, senha];

    const addUser = await pool.query(query, values);
    return addUser;
}

const updateUser = async (id, user) => {
    const { email, apelido, senha } = user;

    const query = "UPDATE tb_usuario SET email = $1, apelido = $2, senha = $3 WHERE id = $4";
    const values = [email, apelido, senha, id];

    const updateUser = await pool.query(query, values);
    return updateUser;
}

const deleteUser = async (id) => {
    const query = "DELETE FROM tb_usuario WHERE id = $1";
    const removeUser = await pool.query(query, [id]);
    return removeUser;
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
}