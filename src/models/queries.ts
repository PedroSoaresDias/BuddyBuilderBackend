// Consultas SQL para o userModel
const userFields: string = `
    json_build_object(
        'id', u.id,
        'apelido', u.apelido,
        'email', u.email,
        'created_at', u.created_at,
        'updated_at', u.updated_at,
        'altura', u.altura,
        'peso', u.peso,
        'imc', u.imc,
        'treinos_finalizados', u.treinos_finalizados,
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
`;

export const userBaseQuery: string = `
    SELECT
        ${userFields}
    FROM tb_usuario u
`;

// Consultas SQL para o treinoController
const treinoFields: string = `
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
`;

export const treinoBaseQuery: string = `
    SELECT
        ${treinoFields}
    FROM tb_treino t
`;