const { getAllUsers, getUserById, addUser, updateUser, deleteUser } = require("../../src/models/userModel");
const pool = require("../../src/models/connection");

jest.mock("../../src/models/connection");

describe("Testes do Modelo Usuário", () => {

    test("getAllUsers deve retornar todos os usuários", async () => {
        pool.query.mockResolvedValue({ rows: [{ id: 1, email: 'jonh@example.com', apelido: "jonh", senha: "1234abc" }] });
    
        const users = await getAllUsers();
        expect(users).toHaveLength(1);
    });

    test("getUserById deve retornar o usuário especifico", async () => {
        const userId = 1;
        const user = await getUserById(userId);
        expect(user).toBeDefined();
    });

    test("addUser deve adicionar um novo usuário", async () => {
        const newUser = pool.query.mockResolvedValue({ rows: [{ id: 10, email: 'jason@example.com', apelido: "jason", senha: "json" }] });

        const user = await addUser(newUser);
        expect(user).toBeDefined();
    });

    test("updateUser deve atualiza o usuário especifico", async () => {
        const userUpdateInfo = pool.query.mockResolvedValue({ rows: [{ id: 1, email: 'update@example.com', apelido: "jonhUpdate", senha: "1234abc" }] });
        
        const userId = 1;
        const user = await updateUser(userId, userUpdateInfo);
        expect(user).toBeDefined();
    });

    test("deleteUser deve excluir o usuário especifico", async () => {
        const userId = 1;
        const user = await deleteUser(userId);
        expect(user).toBeDefined();
    });
});