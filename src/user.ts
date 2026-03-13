import db from "./libe/db.js";
import type { NovoservicoType, utilizadorType } from "./util/types.js";

export async function getUser() {
    const [rows] = await db.execute("SELECT * FROM tabela_utilizadores;")
    return rows
}


export async function getUserById(id: string) {
    const [rows] = await db.execute(
        "SELECT * FROM tabela_utilizadores WHERE tabela_utilizadores.id = ?", [id])
    if (Array.isArray(rows) && rows.length === 0)
        return null
    return Array.isArray(rows) ? rows[0] : null
}


export function novoUtilizador(utilizador: utilizadorType) {
    console.log({ "utilizador users.ts": utilizador })
    try {
        const user = db.execute(`insert into tabela_utilizadores values (?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                utilizador.id,
                utilizador.nome,
                utilizador.numero_identificacao,
                utilizador.data_nascemento,
                utilizador.email,
                utilizador.telefone,
                utilizador.pais,
                utilizador.localidade,
                utilizador.password,
                utilizador.enabled,
                utilizador.created_at,
                utilizador.update_at
            ])
        if (Array.isArray(user) && user.length === 0) return null
        return user
    } catch (error) {
        console.log({ "error": error })
        return null
    }
}


export async function novoServico(NovoServico: NovoservicoType) {
    console.log({ "New service": NovoServico })
    try {
        const row = await db.execute(`INSERT INTO tabela_servicos Values (?,?,?,?,?,?,?)`,
            [
                null,
                NovoServico.nome,
                NovoServico.descricao,
                NovoServico.categoria,
                NovoServico.enabled,
                NovoServico.created_at,
                NovoServico.updated_at
            ])
        if (!row) return null
        return row

    } catch (error) {
        console.log({ "error": error })
        return null
    }
}
