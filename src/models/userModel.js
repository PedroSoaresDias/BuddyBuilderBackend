const pool = require("./connection")

const getAllUsers = async () => {
    const user = await pool.query("SELECT * FROM tb_usuario");
    return user.rows;
}

module.exports = {
    getAllUsers
}