const pool = require("./connection")

const getAllUsers = async () => {
    const user = await pool.query("SELECT * FROM tb_usuario");
    return user.rows;
}

const addUser = async (user) => {
    const { email, apelido, senha } = user;

    const query = "INSERT INTO tb_usuario(email, apelido, senha) VALUES($1, $2, $3)";
    const values = [email, apelido, senha];

    const addUser = await pool.query(query, values);
    return addUser;
}

module.exports = {
    getAllUsers,
    addUser,
}